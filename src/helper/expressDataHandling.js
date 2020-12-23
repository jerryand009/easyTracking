import qs from "qs";
import axios from "axios"
import xml2json from './xml2json'
const expressDataHandling = (cargo,trackingResponse)=>{
    // console.log(trackingResponse);
    let result = {
        tracking:"",
        pieces:[], //{tracking,atd,eta,ata,status}
        origin:"",
        destination:"",
        atd:"", //string
        eta:"",
        ata:"",    // string
        status:"", // string 已送达 正在运送
        checkPoints:[],
        responseErrors:{}, // {message,tracking}
        comment:""
    };
    if (cargo.forwarder==="DHL"){
        return new Promise((resolve,reject)=>{
            result.forwarder = "DHL";
            // DHL API拿到的日期格式 "Monday, November 02, 2020 18:37"或者"Monday, November 02, 2020 " ，定义getDate函数方便转化
            let getDate = (dateStr)=>{
                let monthList={"January":0,"February":1,"March":2,"April":3,"May":4,"June":5,"July":6,"August":7,"September":8,"October":9,"November":10,"December":11};
                let Y = dateStr.split(",")[2].split(" ")[1];  // 年 2020
                let h,m;
                if (dateStr.split(",")[2].split(" ").length===2 || dateStr.split(",")[2].split(" ")[2]===""){
                    h=m="";
                }else {
                    h = dateStr.split(",")[2].split(" ")[2].split(":")[0];  // 时 18
                    m = dateStr.split(",")[2].split(" ")[2].split(":")[1];  // 分 37
                }
                let M = monthList[dateStr.split(",")[1].split(" ")[1]]; // 月 monthList["November"]
                let D = dateStr.split(",")[1].split(" ")[2];  // 天 02
                return new Date(Y,M,D,h,m)
            };
            // 错误运单号是返回
            if (trackingResponse.hasOwnProperty("errors")){
                result.responseErrors={
                    message:trackingResponse.errors[0].message,
                    tracking:trackingResponse.errors[0].id
                }
            }else {
                let dhl = trackingResponse.results[0];
                result.tracking = dhl.id;
                result.pieces = [];
                dhl.pieces.pIds.forEach(item=>{
                    result.pieces.push({tracking:item,status:"",ata:"",eta:""})
                });
                result.origin = dhl.origin.value.replace("CHAOSHAN & HUIZHOU AREA - ","");
                result.destination = dhl.destination.value;
                let firstCheckPoint = dhl.checkpoints.find(item=>item.counter===1);
                result.atd = getDate(firstCheckPoint.date+firstCheckPoint.time);
                if (dhl.hasOwnProperty("delivery") && dhl.delivery.code==="101"){ // 101是已送达 102是正在运送
                    result.ata = getDate(dhl.description);
                    result.status = "已送达"
                }else{
                    result.status = "正在运送";
                    result.eta = dhl.edd.hasOwnProperty("date")?getDate(dhl.edd.date):""
                }
                result.checkPoints = dhl.checkpoints;
                result.checkPoints.forEach(item=>{
                    item.actDate=getDate(item.date+item.time);
                    item.status = item.description;
                    item.scanLocation = item.location;
                })
                //[{counter:"44",description:"清关中",time:"21:40",date: "星期三, 十一月 25, 2020",location: "LEIPZIG - GERMANY"}]
            }
            resolve(result)
        })
    }else if (cargo.forwarder==="FEDEX"){
        return new Promise((resolve,reject)=>{
            result.forwarder = "FEDEX";
            let fedex = trackingResponse.TrackPackagesResponse.packageList[0];
            if (fedex.isInvalid){
                result.responseErrors={
                    message:"This tracking number cannot be found. Please check the number or contact the sender.",
                    tracking:cargo.tracking
                };
                resolve(result)
            }else{
                result.tracking = fedex.trackingNbr;
                result.origin = `${fedex.shipperCity} ${fedex.shipperCntryCD}`;
                result.destination = `${fedex.recipientCity} ${fedex.recipientCntryCD}`;
                result.atd = new Date(fedex.tenderedDt);
                result.eta = fedex.hasOwnProperty("displayEstDeliveryDt")&&fedex.displayEstDeliveryDt!==""?new Date(fedex.displayEstDeliveryDt):"";
                result.checkPoints = fedex.scanEventList;
                result.checkPoints.forEach(item=>item.actDate=new Date(item.date+"T"+item.time+item.gmtOffset));
                // 有关联包裹时请求关联包裹的信息
                if (fedex.hasAssociatedShipments){
                    let req = {};
                    req.url="https://www.fedex.com/trackingCal/track";
                    req.method="POST";
                    req.headers={'content-type':'application/x-www-form-urlencoded' };
                    req.data=qs.stringify({
                        action:"getAssociatedShipments",
                        data:`{"AssociatedShipmentRequest":{"appType":"WTRK","appDeviceType":"DESKTOP","uniqueKey":"","processingParameters":{},"masterTrackingNumberInfo":{"trackingNumberInfo":{"trackingNumber":"${result.tracking}","trackingQualifier":"","trackingCarrier":""},"associatedType":"MPS"}}}`,
                        locale:"zh_CN",
                        version:"1",
                        format:"json"
                    });
                    axios(req).then(res=>{
                        let relatedPackage = res.data.AssociatedShipmentsResponse.associatedShipmentList;
                        let flag = false; // 如果发现任意一个包裹未送达就改为true
                        // console.log("relatedPackage",relatedPackage);
                        relatedPackage.forEach(item=>{
                            result.pieces.push({
                                tracking:item.trackingNbr,
                                atd:new Date(item.tendDt),
                                status:item.keyStatus,
                                ata:item.actDeliveryDt?new Date(item.actDeliveryDt):"",
                                eta:item.estDeliveryDt?new Date(item.estDeliveryDt):"",
                            });
                            if (item.keyStatus!=="已送达"){
                                flag = true;
                                result.status = "部分子件未送达";
                                result.eta = item.estDeliveryDt>result.eta?new Date(item.estDeliveryDt):result.eta
                            }
                        });
                        if (!flag){ // 没有不是"已送达"状态的包裹说明都送达了
                            result.status = "已送达";
                            result.ata = fedex.actDeliveryDt?new Date(fedex.actDeliveryDt):""
                        }
                        resolve(result);
                    })
                }else{
                    // 没有关联包裹，只有单独一个包裹的：
                    if (fedex.isDelivered){
                        result.ata = new Date(fedex.actDeliveryDt);
                        result.status = "已送达"
                    }else{
                        result.eta = new Date(fedex.estDeliveryDt);
                        result.status = "正在运送"
                    }
                    resolve(result)
                }
            }
        })
    }else if (cargo.forwarder==="UPS"){
        return new Promise((resolve,reject)=>{
            result.forwarder = "UPS";
            let upsGetDate = (str1,str2)=>{
                // str1  20201130
                // str2  120000
                let Y = str1.slice(0,4);       //  年 2020
                let M = str1.slice(4,6)-1;     //  月 11
                let D = str1.slice(6);         //  日 30
                let h = str2?str2.slice(0,2):"";        //  时 12
                return new Date(Y,M,D,h)
            };
            // xml字符串转xml对象
            let xmlObj = xml2json.getXmlObject(trackingResponse);
            // xml对象转json对象
            let jsonObj = xml2json.xmlToJson(xmlObj);
            if (jsonObj.TrackResponse.Response.hasOwnProperty("Error")){
                result.responseErrors={
                    message:jsonObj.TrackResponse.Response.Error.ErrorDescription["#text"],
                    tracking:cargo.tracking
                };
                resolve(result);
            }else{
                let ups = jsonObj.TrackResponse.Shipment;
                result.tracking = ups.ShipmentIdentificationNumber["#text"];
                result.origin = `${ups.Shipper.Address.City["#text"]} ${ups.Shipper.Address.CountryCode["#text"]}`;
                result.destination = `${ups.ShipTo.Address.City["#text"]} ${ups.ShipTo.Address.CountryCode["#text"]} `;
                result.atd = upsGetDate(ups.PickupDate["#text"]);
                result.eta = ups.Package.hasOwnProperty("RescheduledDeliveryDate")?
                    // ups.Package.RescheduledDeliveryDate  20201130
                    // ups.Package.RescheduledDeliveryTime  120000
                    upsGetDate(ups.Package.RescheduledDeliveryDate["#text"],ups.Package.RescheduledDeliveryTime["#text"]):"";
                if (ups.Package.Activity[0].Status.StatusType.Code["#text"]==="D"){
                    result.status = "已送达";
                    result.ata = new Date(ups.Package.Activity[0].GMTDate["#text"]+"T"+ups.Package.Activity[0].GMTTime["#text"]+ups.Package.Activity[0].GMTOffset["#text"])
                }else{
                    result.status = "正在运送"
                }
                result.checkPoints = ups.Package.Activity;
                result.checkPoints.forEach(item=>{
                    item.actDate=new Date(item.GMTDate["#text"]+"T"+item.GMTTime["#text"]+item.GMTOffset["#text"]);
                    item.status = item.Status.StatusType.Description["#text"];
                    item.scanLocation = item.ActivityLocation.Address.hasOwnProperty("City")?
                        item.ActivityLocation.Address.hasOwnProperty("CountryCode")?item.ActivityLocation.Address.City["#text"]+" "+item.ActivityLocation.Address.CountryCode["#text"]:item.ActivityLocation.Address.City["#text"]
                        :""
                });

                // 关联包裹
                let req = {};
                req.url="https://onlinetools.ups.com/rest/Track";
                req.data={
                            Security: {
                                UPSServiceAccessToken: {
                                    AccessLicenseNumber: "2C89134F4D10E2D8"
                                },
                                UsernameToken: {
                                    Username: "CST6636EY",
                                    Password: "123456Aa"
                                }
                            },
                            TrackRequest: {
                                InquiryNumber: result.tracking,
                                Request: {
                                    RequestAction: "Track",
                                    RequestOption: "activity",
                                    SubVersion: "1907",
                                    ReferenceNumber:{"Value": ""}
                                }
                            }
                        };
                // 二次请求 拿到关联包裹的状态
                axios.post(req.url,req.data).then(res=>{
                    // console.log("ups二次请求关联包裹",res);
                    res.data.TrackResponse.Shipment.Package.forEach(item=>{
                        result.pieces.push({
                            tracking:item.TrackingNumber,
                            atd:upsGetDate(res.data.TrackResponse.Shipment.PickupDate,""),
                            status:item.hasOwnProperty("DeliveryDate")?"已送达":"正在运送",
                            ata:item.hasOwnProperty("DeliveryDate")?new Date(upsGetDate(item.DeliveryDate,"")):"",
                            eta:item.hasOwnProperty("DeliveryDetail")?new Date(upsGetDate(item.DeliveryDetail.Date,item.DeliveryDetail.Time)):"",
                            current:{
                                location:item.Activity[0].ActivityLocation.Address.City + " " + item.Activity[0].ActivityLocation.Address.CountryCode,
                                date:new Date(item.Activity[0].GMTDate+"T"+item.Activity[0].GMTTime+item.Activity[0].GMTOffset),
                                status:item.Activity[0].Status.Description
                            }
                        })
                    });
                    resolve(result);
                });
            }
        })
    }
};

export default expressDataHandling