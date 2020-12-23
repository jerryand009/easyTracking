import React,{useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './static/css/common.scss'
import './static/css/App.scss'
import NavTabs from './components/NavTabs'
import CargoList from './components/CargoList'
import TrackingDetail from './components/TrackingDetail'
import Comment from './components/TrackingDetail/comment'
import Toast from './components/Toast/toast'
import {db_Open,db_Add,db_FindAll,db_FindById,db_Update} from './db/db'
import axios from 'axios'
import qs from 'qs'
import expressDataHandling from './helper/expressDataHandling'
import airLineList from './db/airLineList'
import {oceanLineList,oceanLinesObj} from './db/oceanLineList'
import useKeyPress from "./helper/keyPress";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShip} from "@fortawesome/free-solid-svg-icons/faShip";
import {faPlane} from "@fortawesome/free-solid-svg-icons";
const {ipcRenderer} = window.require('electron');
const dbName = "defaultDB";
const expressStore = "expressShipment";

function App() {
    // 切换导航栏
    const [activeTab,setActiveTab] = useState(0);
    const navTabClickHandler = (id) =>{
        setActiveTab(id);
        console.log("tab"+id)
    };

    const [showInTransit,setShowInTransit] = useState(true);
    const [cargos,setCargos] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [currentCargo,setCurrentCargo] = useState();
    const [trackingResult,setTrackingResult] = useState();
    const [networkError,setNewWorkError] = useState(false);
    const [awb,setAwb] = useState("");
    const [awbHistory,setAwbHistory] = useState([]);
    const [currentAirline,setCurrentAirline] = useState({});
    const [airTrackingURL,setAirTrackingURL] = useState("");
    const [awbIsInvalid,setAwbIsInvalid] = useState(false);
    const [containerNumber,setcontainerNumber] = useState("");
    const [containerHistory,setContainerHistory] = useState([]);
    const [containerNumberInvalid,setContainerNumberInvalid] =useState(false);
    const [currentOceanLine,setCurrentOceanLine] = useState({});
    const [oceanTrackingURL,setOceanTrackingURL] = useState("");
    const [hideLeftPart,setHideLeftPart] = useState(false);
    const [toastDict,setToastDict] = useState({msg:"info",type:"Welcome"});
    const [toggleToast,setToggleToast] = useState(false);

    useEffect(()=>{
        // 数据库读取shipment清单
        getTableData();
    },[]);
    const getTableData = ()=>{
        db_Open(dbName,expressStore).then(db=>{
            console.log("read express Data");
            return db_FindAll(db,expressStore);
        }).then(res=>{
            console.log("update Table");
            console.log("更新table",res);
            let cleanRes = res.filter(item=>item.id!=="airHistory" && item.id!=="containerHistory");
            setCargos(cleanRes);
        });
    };
    const getTrackingDetails=(id)=>{
        if (isLoading){
            console.log("warning","请求过于频繁");
            popMsg("info","HTTP request is being sent,please wait for response.");
            return
        }
        db_Open(dbName,expressStore).then(db=>{
            return db_FindById(db,expressStore,id);
        }).then(data=>{
            console.log("clicked Row",data);
            setCurrentCargo(data);
            // 从数据库拿到的数据如果有ATA有数据，则不发起网络请求，直接将数据渲染出来；没有ATA则进行网络请求
            if (data.ata){
                setTrackingResult(data);
                return null
            }else{
                return expressTracking(data)
            }
        }).then(resDict=>{
            console.log("resDict",resDict);
            if (!resDict){return} // resDict是null时，也就是没有发起网络请求时return 不执行后面代码
            let res = resDict.res;
            res.comment = resDict.cmt;
            // 如果有返回值，则补充信息，ctns，时间戳，从数据库拿
            console.log("processed tracking response",res);
            res.ctns = res.pieces.length===0?1:res.pieces.length;
            res.timestamp = new Date();
            setTrackingResult(res);

            if (!res.tracking){return} // 返回的处理好的tracking 数据res有错误，则不写入数据库
            // 返回的处理好的tracking 数据res正确则更新数据库
            db_Open(dbName,expressStore).then(db=>{
                return db_Update(db,expressStore,res);
            }).then(msg=>{
                console.log("db update response",msg);
                getTableData();         // 更新Table数据
            });
        });
    };
    const expressTracking=(cargo)=>{
        return new Promise(resolve=>{
            let reqDict= {};
            switch (cargo.forwarder) {
                case "FEDEX":
                    reqDict.url="https://www.fedex.com/trackingCal/track";
                    reqDict.method="POST";
                    reqDict.headers={'content-type':'application/x-www-form-urlencoded' };
                    reqDict.data=qs.stringify({
                        action:"trackpackages",
                        data:`{"TrackPackagesRequest":{"appType":"WTRK","appDeviceType":"DESKTOP","supportHTML":true,"supportCurrentLocation":true,"uniqueKey":"","processingParameters":{},"trackingInfoList":[{"trackNumberInfo":{"trackingNumber":"${cargo.tracking}","trackingQualifier":"","trackingCarrier":""}}]}}`,
                        locale:"zh_CN",
                        version:"1",
                        format:"json"
                    });
                    break;
                case "DHL":
                    reqDict.url=`http://www.cn.dhl.com/shipmentTracking?AWB=${cargo.tracking}&countryCode=cn&languageCode=en`;
                    reqDict.method="GET";
                    break;
                case "UPS":
                    reqDict.async=true;
                    reqDict.crossDomain=true;
                    reqDict.url="https://onlinetools.ups.com/ups.app/xml/Track";
                    reqDict.method="POST";
                    reqDict.headers={'content-type':'application/xml;charset=UTF-8',"cache-control": "no-cache"};
                    reqDict.data=`<?xml version="1.0"?><AccessRequest xml:lang="en-US"><AccessLicenseNumber>2C89134F4D10E2D8</AccessLicenseNumber><UserId>CST6636EY</UserId><Password>123456Aa</Password></AccessRequest><?xml version="1.0"?><TrackRequest xml:lang="en-US"><Request><TransactionReference><CustomerContext>Your Test Case Summary Description</CustomerContext></TransactionReference><RequestAction>Track</RequestAction><RequestOption>activity</RequestOption></Request><TrackingNumber>${cargo.tracking}</TrackingNumber></TrackRequest>`;
                    break;
            }
            if (isLoading){return}
            setNewWorkError(false);
            // 如果上一次请求的结果是错误的，设置trackingResult为null，可以实现从错误页面重新发起请求后变为isLoading页面，页面更友好的展示
            if (trackingResult && trackingResult.hasOwnProperty("responseErrors") && trackingResult.responseErrors.hasOwnProperty("tracking")){
                setTrackingResult(null)
            }
            setIsLoading(true);
            axios(reqDict).then(res=>{
                return res.data;
            }).then(data=>{
                return expressDataHandling(cargo,data);
            }).then(result=>{
                setIsLoading(false);
                console.log("Tracking Result",result);
                setTrackingResult(result);
                // 拼接currentCargo和Result，用于更新indexedDB
                let cmt = cargo.comment;
                resolve({res:Object.assign(cargo,result),cmt:cmt})
            }).catch(error=>{
                if (error.hasOwnProperty("message")){setNewWorkError(true)}
                // error.hasOwnProperty("message")?console.log(error.message):console.log(error);
                setIsLoading(false);
            })
        })
    };
    const saveComment = (v)=>{
        trackingResult.comment=v;
        console.log('tR',trackingResult);
        db_Open(dbName,expressStore).then(db=>{
            return db_Update(db,expressStore,trackingResult);
        }).then(msg=>{
            console.log("db update response",msg);
            popMsg("info","Comment saved.");
            getTableData();
        }).catch(error=>{
            popMsg("error","Comment not saved yet.Please try again later");
            console.log(error);
        });
    };

    // awb & container searchHistory
    useEffect(()=>{
        db_Open(dbName,expressStore).then(db=>{
            return db_FindById(db,expressStore,"airHistory")
        }).then(res=>{
            if (res.hasOwnProperty("error")){
                db_Open(dbName,expressStore).then(db=>{
                    db_Add(db,expressStore,{id:"airHistory",airHistory:[]})
                });
                return
            }
            setAwbHistory(res.awbHistory)
        });
    },[]);
    useEffect(()=>{
        db_Open(dbName,expressStore).then(db=>{
            return db_FindById(db,expressStore,"containerHistory")
        }).then(res=>{
            if (res.hasOwnProperty("error")){
                db_Open(dbName,expressStore).then(db=>{
                    db_Add(db,expressStore,{id:"containerHistory",containerHistory:[]})
                });
                return
            }
            setContainerHistory(res.containerHistory)
        });
    },[]);

    const airTracking = (awb)=>{
        // 每次点击search时如果不是loading状态就先将原来的webview删掉
        if(airTrackingURL){
            if (document.getElementById("webview-air")&&!isLoading){
                document.getElementsByClassName('airTracking')[0].removeChild(document.getElementById("webview-air"))
            }
        }
        // 判断awb是否符合规则
        if (awb && !awb.match(RegExp(/^\d{3}-\d{8}$/))){
            setAwbIsInvalid(true);
            return null
        }
        setAwbIsInvalid(false);
        if (isLoading){
            console.log("请求服务器中，请耐心等待");
            popMsg("info","HTTP request is being sent,please wait for response.");
            return
        }
        // 不是loading状态就判断是哪个航司的，根据航司找到查询链接，然后设为isloading，并将不重复的awb#放进awbHistory List中
        let [lineCode,shipmentNum] = awb.split("-");
        if (airLineList.hasOwnProperty(lineCode)){
            setCurrentAirline(airLineList[lineCode]);
            let url = airLineList[lineCode].pageUrl.replace("lineCode",lineCode).replace("shipmentNum",shipmentNum);
            setAirTrackingURL(url);
            setIsLoading(true);
            if (awbHistory.findIndex(item=>item===awb)===-1){
                let historyAWBList = [awb,...awbHistory];
                setAwbHistory(historyAWBList);
                db_Open(dbName,expressStore).then(db=>{
                    return db_Update(db,expressStore,{id:"airHistory",awbHistory:historyAWBList})
                }).then(res=>{
                    console.log("airHistory List:",res);
                });
            }
            // 页面中没有webview-air时，创建webview-air并插入页面
            if (!document.getElementById("webview-air")) {
                let div = document.getElementsByClassName('airTracking')[0];
                let html = document.createElement('webview');
                html.src = url;
                html.className = "iframe";
                html.id = "webview-air";
                div.appendChild(html);
            }
        }else{
            console.log("Current AirLine is not supported");
            popMsg("info","Current AirLine is not supported")
        }
    };
    // webview在加载的时候，将isLoading设为True，读取完之后设为flase
    useEffect(()=>{
        if (!airTrackingURL){return}
        const webview = document.querySelector("#webview-air");
        if (!webview){return}
        const didStopLoadingEvent = (e)=>{
            setIsLoading(false);
        };
        webview.addEventListener("did-stop-loading",didStopLoadingEvent);
        return ()=>{
            webview.removeEventListener("did-stop-loading",didStopLoadingEvent)
        }
    });

    const selectOceanLine = (containerNumber)=>{
        if (containerNumber && !containerNumber.match(RegExp(/^[a-zA-Z]{4}\d{7}$/))){
            setContainerNumberInvalid(true);
            return null
        }
        setContainerNumberInvalid(false);
        let lineCode = containerNumber.slice(0,4);
        if (oceanLineList.hasOwnProperty(lineCode)){
            if (!oceanLineList[lineCode].pageUrl){
                // 集装箱租赁公司
                setCurrentOceanLine({});
                console.log(`Current container is belong to ${oceanLineList[lineCode].nameEn}(Lessor).Please select the OceanLine to tracking this container`);
            }else{
                // 非集装箱租赁公司：
                let k = Object.keys(oceanLinesObj).find(item=>{
                    if (oceanLineList[lineCode].nameEn===oceanLinesObj[item].nameEn){
                        return item;
                    }
                });
                setCurrentOceanLine({lineCode:k,...oceanLineList[lineCode]})//{lineCode:COSCO,nameZh:"",nameEn:"",pageURL:""}
            }
        }else{
            setCurrentOceanLine({});
            console.log("Current OceanLine is not supported");
        }
    };
    const oceanTracking = (containerNumber,historyLine)=>{
        let url; // 船公司网站
        let k; // 船公司缩写

        if(oceanTrackingURL){
            if (document.getElementById("webview-ocean")&&!isLoading){
                document.getElementsByClassName('oceanTracking')[0].removeChild(document.getElementById("webview-ocean"))
            }
        }
        if (isLoading){
            console.log("请求页面中，请耐心等待");
            popMsg("info","HTTP request is being sent,please wait for response.");
            return
        }
        let lineCode = containerNumber.slice(0,4);

        //  能找得到的
        if (oceanLineList.hasOwnProperty(lineCode) && oceanLineList[lineCode].pageUrl){
            k = Object.keys(oceanLinesObj).find(item=>{
                if (oceanLineList[lineCode].nameEn===oceanLinesObj[item].nameEn){
                    return item;
                }
            });
            url = oceanLineList[lineCode].pageUrl.replace("containerNumber",containerNumber);
        }else {
            // 集装箱租赁公司或者找不到对应LineCode的
            if (document.getElementById("oeacnLine").value!=="default"){
                k = document.getElementById("oeacnLine").value;
                console.log("k",k);
                url = oceanLinesObj[k].pageUrl.replace("containerNumber",containerNumber);
            }
        }
        setCurrentOceanLine({lineCode:k,...oceanLinesObj[k]});

        // 从previous Search点击过来时：
        if (historyLine){
            setCurrentOceanLine(historyLine);
            url = historyLine.pageUrl.replace("containerNumber",containerNumber);
        }
        setOceanTrackingURL(url);
        setIsLoading(true);
        if (containerHistory.findIndex(item=>item.containerNumber===containerNumber)===-1) {
            let historyContainer = [{containerNumber,currentOceanLine:{lineCode:k,...oceanLinesObj[k]}},...containerHistory];
            setContainerHistory(historyContainer);
            db_Open(dbName,expressStore).then(db=>{
                return db_Update(db,expressStore,{id:"containerHistory",containerHistory:historyContainer})
            }).then(res=>{
                console.log("containerHistory List:",res);
            });
        }

        if (!document.getElementById("webview-ocean")){
            let div = document.getElementsByClassName('oceanTracking')[0];
            let html = document.createElement('webview');
            html.src = url;
            html.className = "iframe";
            html.id = "webview-ocean";
            div.appendChild(html);
        }
    };
    useEffect(()=>{
        if (!oceanTrackingURL){return}
        const webview = document.querySelector("#webview-ocean");
        if (!webview){return}
        const didStopLoadingEvent = (e)=>{
            setIsLoading(false);
        };
        webview.addEventListener("did-stop-loading",didStopLoadingEvent);
        return ()=>{
            webview.removeEventListener("did-stop-loading",didStopLoadingEvent)
        }
    });

    // 切换tab时删掉webview 同时重新生成webview
    useEffect(()=>{
        setIsLoading(false);
        if (activeTab===2 && document.getElementById("webview-air")){
            document.getElementsByClassName('oceanTracking')[0].removeChild(document.getElementById("webview-air"));
        }
        if (activeTab===2){
            // oceanTracking(containerNumber)
        }
        if (activeTab===1 && document.getElementById("webview-ocean")){
            document.getElementsByClassName('airTracking')[0].removeChild(document.getElementById("webview-ocean"));
        }
        if (activeTab===1){
            // airTracking(awb)
        }
    },[activeTab]);

    const f12KeyPressed = useKeyPress(123);
    // 快捷键打开调试工具
    useEffect(()=>{
        if (f12KeyPressed){
            ipcRenderer.send('open-devtools')
        }
    });

    const popMsg = (type,msg)=>{
        setToastDict({type,msg});
        setToggleToast(true)
    };
    const hideMsg = ()=>{
        setToggleToast(false)
    };
    return (
        <div className="App container-fluid mx-0">
            <Toast toastDict={toastDict} toggleToast={toggleToast} hideMsg={hideMsg}/>
            <div className="hideLeftPart" onClick={()=>{setHideLeftPart(!hideLeftPart)}}>
                <svg className="bi bi-arrow-left-right" width="1em" height="1em" viewBox="0 0 16 16"
                     fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10.146 7.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L12.793 11l-2.647-2.646a.5.5 0 0 1 0-.708z"></path>
                    <path fillRule="evenodd" d="M2 11a.5.5 0 0 1 .5-.5H13a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 11zm3.854-9.354a.5.5 0 0 1 0 .708L3.207 5l2.647 2.646a.5.5 0 1 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"></path>
                    <path fillRule="evenodd" d="M2.5 5a.5.5 0 0 1 .5-.5h10.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"></path>
                </svg>
            </div>
            <div className="row no-gutters">
                <div className={!hideLeftPart?"tracking-tabs col-5 pt-2":"displayNone"}>
                    <NavTabs tabList={[
                        {id:0,title:"Express"},
                        {id:1,title:"Airfreight"},
                        {id:2,title:"Seafreight"}
                    ]} activeTab={activeTab} onTabClick={(id)=>navTabClickHandler(id)}
                    />
                    <div className="mt-3 cargoList">
                        {
                            // 快递
                            activeTab===0?
                                <CargoList cargos={cargos}
                                           titleList={showInTransit?["ATD","Tracking","ETA","Forwarder","Initiator","Destination"]:["ATD","Tracking","ATA","Forwarder","Initiator","Destination"]}
                                           showInTransit={showInTransit}
                                           inTransitOnly={()=>{setShowInTransit(true)}}
                                           deliveredOnly={()=>{setShowInTransit(false)}}
                                           getTrackingDetails={getTrackingDetails}
                                           setCargos={(cargos)=>{setCargos(cargos)}}
                                           getTableData={getTableData}
                                           popMsg = {popMsg}
                                />:
                            //空运
                            activeTab===1?
                                <>
                                    <p className="h5 alert-light">Track air cargo for 130 airlines here</p>
                                    <div className="form-inline align-items-baseline mt-2">
                                    <span className="h6 font-weight-bold mr-2"> Air Waybill:</span>
                                    <input type="text" className="form-control form-control-sm" value={awb} onChange={(e)=>{setAwb(e.target.value)}}/>
                                    <button className="h4 btn btn-sm btn-outline-primary ml-2" onClick={()=>{airTracking(awb)}}>Search</button>
                                    </div>
                                    {
                                        awbIsInvalid?
                                            <div className="alert-danger">
                                                Invalid Air Way Bill Number
                                            </div>:""
                                    }
                                    <div className="awbHistory mt-3 h5 alert-light">
                                        {awbHistory.length>0?"Previous searches:":""}
                                        <ul className="list-group mt-2">
                                        {
                                            awbHistory.map((item,index)=>{
                                                return <li className="list-group-item pointer align-items-center" key={index}
                                                           onClick={()=>{setAwb(item);airTracking(item)}}>
                                                    <span>{item}</span>
                                                    <span className="float-right pointer btn-outline-danger btn-sm pt-0 pb-0" onClick={
                                                        (e)=>{
                                                            e.stopPropagation();
                                                            let historyAwb = [...awbHistory.slice(0,index),...awbHistory.slice(index+1)];
                                                            setAwbHistory(historyAwb);
                                                            db_Open(dbName,expressStore).then(db=>{
                                                                return db_Update(db,expressStore,{id:"airHistory",awbHistory:historyAwb})
                                                            }).then(res=>{console.log("airHistroy Edited:",res)})
                                                        }
                                                    }>&times;</span>
                                                </li>
                                            })
                                        }
                                    </ul>
                                    </div>
                                </>
                            :
                                //海运
                                <>
                                    <p className="h5 alert-light">Track containers for 45 companies here:</p>
                                    <div className="form-inline align-items-baseline mt-2">
                                        <span className="h6 font-weight-bolder mr-2"> Container:</span>
                                        <input type="text" className="form-control form-control-sm mr-2"
                                               value={containerNumber}
                                               onChange={(e)=>{setcontainerNumber(e.target.value);setContainerNumberInvalid(false)}}
                                               onBlur={(e)=>{selectOceanLine(e.target.value)}}
                                        />
                                        <select id="oeacnLine"
                                                value={currentOceanLine.lineCode?currentOceanLine.lineCode:"default"}
                                                className="form-control form-control-sm w-25"
                                                onChange={(e)=>{if (e.target.value!=="default"){setCurrentOceanLine({lineCode:e.target.value,...oceanLinesObj[e.target.value]})}}}
                                        >
                                            <option value="default">Select OceanLine</option>
                                            {
                                                Object.keys(oceanLinesObj).sort().map(item=>{
                                                    return <option value={item}
                                                                   key={item}
                                                            >
                                                                {oceanLinesObj[item].nameEn}
                                                            </option>
                                                })
                                            }
                                        </select>
                                        <button className="h4 btn btn-sm btn-outline-primary ml-2" disabled={containerNumberInvalid || !currentOceanLine.hasOwnProperty("lineCode")} onClick={()=>{oceanTracking(containerNumber)}}>Search</button>
                                    </div>
                                    {
                                        containerNumberInvalid?
                                            <div className="alert-danger">
                                                Invalid Container Number
                                            </div>:""
                                    }
                                    <div className="mt-3 h5 alert-light">
                                        {containerHistory.length>0?"Previous searches:":""}
                                        <ul className="containerHistory list-group mt-3 w-75 overflow-auto">
                                        {
                                            containerHistory.map((item,index)=>{
                                                return <li className="list-group-item pointer align-items-center" key={index}
                                                           onClick={()=>{setcontainerNumber(item.containerNumber);oceanTracking(item.containerNumber,item.currentOceanLine)}}>
                                                    <span>{item.containerNumber}</span>
                                                    <span className="ml-5">{item.currentOceanLine.lineCode}</span>
                                                    <span className="float-right pointer btn-outline-danger btn-sm pt-0 pb-0" onClick={
                                                        (e)=>{
                                                            e.stopPropagation();
                                                            let historycontainer = [...containerHistory.slice(0,index),...containerHistory.slice(index+1)]
                                                            setContainerHistory(historycontainer);
                                                            db_Open(dbName,expressStore).then(db=>{
                                                                return db_Update(db,expressStore,{id:"containerHistory",containerHistory:historycontainer})
                                                            }).then(res=>{console.log("containerHistroy Edited:",res)})
                                                        }
                                                    }>&times;</span>
                                                </li>
                                            })
                                        }
                                    </ul>
                                    </div>
                                </>
                        }
                    </div>
                </div>
                <div className={!hideLeftPart?"tracking-detail col-7":"tracking-detail col-12"}>
                    {
                        // 快递
                        activeTab===0?
                            <>
                                <TrackingDetail
                                    currentCargo={currentCargo}
                                    isLoading={isLoading}
                                    networkError={networkError}
                                    trackingResult={trackingResult}
                                />
                                <div className="container">
                                    <Comment msg={trackingResult?trackingResult.comment||"":""} saveComment={(v)=>saveComment(v)}/>
                                </div>
                            </>:
                        // 空运
                        activeTab===1?
                            <div className="airTracking">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div><FontAwesomeIcon icon={faPlane}/><span className="h6 font-weight-bolder mr-3 pl-2">航空公司:</span>{currentAirline && currentAirline.nameZh}</div>
                                    <span className={isLoading?"spinner-border spinner-border-sm":"displayNone"}>
                                        <span className="sr-only">Loading...</span>
                                    </span>
                                    {airTrackingURL?<span className="btn btn-sm btn-outline-light"  onClick={()=>{ipcRenderer.send('open-url', airTrackingURL)}}>
                                        <svg className="bi bi-reply-fill" width="1em" height="1em" viewBox="0 0 16 16"
                                             fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path
      d="M9.079 11.9l4.568-3.281a.719.719 0 0 0 0-1.238L9.079 4.1A.716.716 0 0 0 8 4.719V6c-1.5 0-6 0-7 8 2.5-4.5 7-4 7-4v1.281c0 .56.606.898 1.079.62z"></path>
</svg>
                                    </span>:""}
                                    <div><span className="h6 font-weight-bolder mr-3 pr-2">Airline:</span>{currentAirline && currentAirline.nameEn}</div>
                                </div>
                                <div className="displayNone">URL: {airTrackingURL}</div>
                            </div>
                        :
                            //海运
                            <div className="oceanTracking">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div><FontAwesomeIcon icon={faShip}/> <span className="h6 font-weight-bolder mr-3 pl-2">船公司:</span>{currentOceanLine && currentOceanLine.nameZh}</div>
                                    <span className={isLoading?"spinner-border spinner-border-sm":"displayNone"}>
                                        <span className="sr-only">Loading...</span>
                                    </span>
                                    {oceanTrackingURL?<span className="btn btn-sm btn-outline-light" onClick={()=>{ipcRenderer.send('open-url', oceanTrackingURL)}}>
                                        <svg className="bi bi-reply-fill" width="1em" height="1em" viewBox="0 0 16 16"
                                             fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.079 11.9l4.568-3.281a.719.719 0 0 0 0-1.238L9.079 4.1A.716.716 0 0 0 8 4.719V6c-1.5 0-6 0-7 8 2.5-4.5 7-4 7-4v1.281c0 .56.606.898 1.079.62z"></path>
                                        </svg>
                                    </span>:""}
                                    <div><span className="h6 font-weight-bolder mr-3 pl-2">Oceanline:</span>{currentOceanLine && currentOceanLine.nameEn}</div>
                                </div>
                                <div className="displayNone">URL: {oceanTrackingURL}</div>
                            </div>
                    }

                </div>
            </div>
        </div>
    );
    }

export default App;
