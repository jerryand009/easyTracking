import React,{useState,useEffect} from 'react'
import useKeyPress from '../../helper/keyPress'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons/faSearch";
import useContextMenu from '../../hooks/useContextMenu'
import {getParentNode} from '../../helper/helper'
import dateFormat from '../../helper/dateFormat'
import loadExcelData from '../../helper/loadExcelData'
import Edit from './edit'
import AddTracking from './addTracking'
import {db_BulkAdd, db_FindAll, db_FindById, db_Open, db_Remove} from "../../db/db";
import {v4 as uuidv4} from 'uuid'
const {remote}=window.require('electron');
const dbName = "defaultDB";
const expressStore = "expressShipment";
const datefmt = "YYYY-mm-dd";

const CargoList = ({cargos,titleList,showInTransit,inTransitOnly,deliveredOnly,getTrackingDetails,setCargos,getTableData,popMsg})=>{
    const [keyWord,setKeyWord] = useState("");
    const [editRowId,setEditRowId] = useState();
    const [addRow,setAddRow] = useState();

    let cargoTable_TitleMenu = [{
        label:"Import From Excel",
        click:()=>{
            // 打开文件选择窗口
            remote.dialog.showOpenDialog({
                title:"选择导入的在途跟进表",
                properties:['openFile','multiSelections'],
                filters:[{name:'Excel File',extensions:['xls','xlsx','xlsm']}]
            }).then(res=>{
                // 拿到选择的文件路径进行遍历读取
                console.log(res.filePaths);
                if (res.canceled){console.log("取消导入");return false}
                if (res.filePaths.length<0){console.log("未选择文件");return false}
                loadExcelData(res.filePaths[0],"Sheet1").then(res=>{
                    if (res.length>0 && res[0].hasOwnProperty("Tracking#")){
                        let rawData = res.filter(item=>item["Tracking#"].toString()!="0");
                        let cleanData = [];
                        rawData.forEach(item=>{
                            if (item["Forwarder"].toString().match(RegExp(/dhl|fedex|ups/i))){
                                let res = {
                                    id:uuidv4(),
                                    atd:null,
                                    forwarder:item["Forwarder"].split(" ")[0].toUpperCase(),
                                    tracking:item["Tracking#"].toString().replace(/\s*/g,""),
                                    initiator:item["发货需求者"],
                                    ctns:item["箱数"],
                                    pieces:[],
                                    destination:"",
                                    eta:null,
                                    ata:null,
                                };
                                cleanData.push(res)
                            }
                        });
                        db_Open(dbName,expressStore).then(db=>{
                            return db_BulkAdd(db,expressStore,cleanData)
                        }).then(res=>{

                            console.log(`${res.length}条数据插入数据库成功`);
                        });
                        // 存入数据库同时更新页面展示
                        getTableData();
                        // setCargos(cleanData)
                    }else{
                        console.log("Excel导入模板错误")
                    }
                });
            });
            console.log('clickTitle',clickTitle);
        }
    },{
        label:"Add Tracking",
        click:()=>{
            setAddRow(true);
        }
    }];
    const clickTitle = useContextMenu(cargoTable_TitleMenu,'.cargoTableTitle');
    let cargoTable_RowMenu = [{
        label:"Edit",
        click:()=>{
            // console.log('clickTitle',clickRow);
            let currentElement = getParentNode(clickRow.current,'cargoRow');
            console.log(currentElement.getAttribute("data-id"));
            setEditRowId(currentElement.getAttribute("data-id"));
        }
    },{
        label:"Delete",
        click:()=>{
            // console.log('clickTitle',clickRow);
            let currentElement = getParentNode(clickRow.current,'cargoRow');
            db_Open(dbName,expressStore).then(db=>{
                return db_Remove(db,expressStore,currentElement.getAttribute("data-id"));
            }).then(res=>{
                getTableData();
            })
        }
    }];
    const clickRow = useContextMenu(cargoTable_RowMenu,'.cargoTableBody');

    const enterKeyPressed = useKeyPress(13);
    const escKeyPressed = useKeyPress(27);
    useEffect(()=>{
        getTableData();
        setKeyWord("")
    },[showInTransit]);
    useEffect(()=>{
        if (enterKeyPressed){
            let searchedCargo = [];
            if (!keyWord || keyWord===""){
                getTableData();
                return
            }
            db_Open(dbName,expressStore).then(db=>{
                return db_FindAll(db,expressStore);
            }).then(res=>{
                res.forEach(item=>{
                    let foundItem = false;
                    Object.keys(item).forEach(key=>{
                        if (key!=="id" &&
                            key!=="checkPoints" &&
                            key!=="pieces" &&
                            key!=="responseErrors" &&
                            !item["ata"] === showInTransit) {
                            if (item[key] && item[key].toString().toLowerCase().indexOf(keyWord.toLowerCase())!==-1 ||
                                item[key] && key.match(new RegExp(/atd|ata|eta/i)) && dateFormat("YYYY-mm-dd",item[key]).indexOf(keyWord.toLowerCase())!==-1){
                                foundItem = true
                            }
                        }
                    });
                    if(foundItem){searchedCargo.push(item)}
                });
                console.log("searchedCargo",searchedCargo);
                setCargos(searchedCargo);
            });
        }else if (escKeyPressed&&keyWord){
            closeSearch();
            getTableData();
        }
    });
    const closeSearch = ()=>{
        setKeyWord("");
    };
    return (
        <div className="table-container">
            <Edit editRowId={editRowId} setEditRowId={setEditRowId} getTableData={getTableData} popMsg={popMsg}/>
            <AddTracking addRow={addRow} setAddRow={setAddRow} getTableData={getTableData} popMsg={popMsg}/>
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <span className="form-check form-check-inline">
                        <input type="radio" className="form-check-input" name="status" checked={showInTransit} onClick={()=>inTransitOnly()} onChange={()=>{}} id="intransit"/>
                        <label className="form-check-label pointer" htmlFor="intransit">Intransit</label>
                    </span>
                    <span className="form-check form-check-inline">
                        <input type="radio" className="form-check-input" name="status" checked={!showInTransit} onClick={()=>deliveredOnly()} onChange={()=>{}} id="delivered"/>
                        <label className="form-check-label pointer" htmlFor="delivered">Delivered</label>
                    </span>
                </div>
                <div className="searchDiv">
                    <input type="text" value={keyWord} placeholder="Search keyword" onChange={(e)=>{setKeyWord(e.target.value)}} />
                    <span className="searchIcon">
                        <FontAwesomeIcon icon={faSearch}/>
                    </span>
                </div>
            </div>
            <table className="table table-hover table-sm my-3 cargoList-table">
                <thead className="cargoTableTitle">
                    <tr>
                        {titleList.map((title,index)=>{
                            return <th key={index}>{title}</th>
                        })}
                    </tr>
                </thead>
                <tbody className="cargoTableBody">
                    {
                        cargos.sort((a,b)=>{
                            if (a["atd"] < b["atd"]) {
                                return -1;
                            }
                            if (a["atd"] > ["atd"]) {
                                return 1;
                            }
                            return 0;
                        }).map((cargo)=>{
                        let dataFlag = cargo.status !== "已送达";
                        if (showInTransit === dataFlag){
                            return (
                                <tr className="cargoRow"
                                    key={cargo.id}
                                    onClick={()=>getTrackingDetails(cargo.id)}
                                    data-id={cargo.id}
                                    data-tracking={cargo.tracking}
                                >
                                    {
                                        titleList.map((title,index)=>{
                                            return (
                                                <td key={index}>{
                                                    title.match(RegExp(/atd|ata|eta/i))?
                                                        cargo[title.toLowerCase()]?
                                                            dateFormat(datefmt,cargo[title.toLowerCase()])
                                                            :""
                                                        :cargo[title.toLowerCase()]
                                                }</td>
                                                // <td key={index}>{cargo[title.toLowerCase()]}</td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        }
                    })}
                </tbody>
            </table>
        </div>
    )
};
export default CargoList