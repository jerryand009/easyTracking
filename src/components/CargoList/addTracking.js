import React,{useEffect,useState} from 'react'
import {db_Add, db_BulkAdd, db_Open} from "../../db/db";
import dateFormat from '../../helper/dateFormat'
import {v4 as uuidv4} from 'uuid'
const dbName = "defaultDB";
const expressStore = "expressShipment";

const AddTracking = ({addRow,setAddRow,getTableData,popMsg})=>{
    const [data,setData]=useState({atd:null,forwarder:"",tracking:"",initiator:""});
    const setInputValue = (k,value)=>{
        let inputList = document.getElementsByClassName("addTracking")[0].querySelectorAll("input");
        let obj = {};
        inputList.forEach((item)=>{
            let dk = item.getAttribute("data-k");
            if (dk==="atd" || dk==="ata" || dk==="eta" || dk === "atd"){
                obj[dk]= (item.value==="1970-01-01" || item.value==="") ?null:new Date(item.value)
            }else{
                obj[dk]=item.value
            }
        });
        if (k==="atd" || k==="ata" || k==="eta" || k === "atd"){
            obj[k] = (value==="1970-01-01" || value==="") ?null:new Date(value)
        }else{
            obj[k] = value;
        }
        setData({...data,...obj});
    };
    const updateDB = ()=>{
        if (!data.forwarder || data.forwarder==="default" || !data.tracking){
            console.log("Forwarder and tracking needed");
            popMsg("error","Forwarder and tracking needed");
            return
        }
        let cleaData = {...data,id:uuidv4()};
        db_Open(dbName,expressStore).then(db=>{
            return db_Add(db,expressStore,cleaData)
        }).then(res=>{
            console.log(res);
            setAddRow(false);
            getTableData();
            setData({atd:null,forwarder:"",tracking:"",initiator:""});
        },rej=>{
            console.log(rej.target.error);
        });
    };
    return <div className={addRow?"addTracking":"displayNone"}>
        <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">ATD</span>
            </div>
            <input type="date" className="form-control" data-k="atd" value={dateFormat("YYYY-mm-dd",data["atd"])==="1970-01-01"?"":dateFormat("YYYY-mm-dd",data["atd"])} onChange={(e)=>{setInputValue("atd",e.target.value)}} />
        </div>
        <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">Forwarder</span>
            </div>
            <select className="form-control" data-k="forwarder" value={data["forwarder"]} onChange={(e)=>{setInputValue("forwarder",e.target.value)}}>
                <option value="default">Select Express Company</option>
                <option value="FEDEX">FEDEX</option>
                <option value="DHL">DHL</option>
                <option value="UPS">UPS</option>
            </select>
        </div>
        <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">Tracking#</span>
            </div>
            <input type="text" className="form-control" data-k="tracking" value={data["tracking"]} onChange={(e)=>{setInputValue("tracking",e.target.value)}} />
        </div>
        <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">Initiator#</span>
            </div>
            <input type="text" className="form-control" data-k="initiator" value={data["initiator"]} onChange={(e)=>{setInputValue("initiator",e.target.value)}} />
        </div>
        <div className="float-right mb-2">
            <button type="button" className="btn btn-sm btn-outline-primary" onClick={()=>{updateDB();}}>Confirm</button>
            <button type="button" className="btn btn-sm btn-outline-primary" onClick={()=>{setData({atd:null,forwarder:"",tracking:"",initiator:""});}}>Reset</button>
            <button type="button" className="btn btn-sm btn-outline-primary" onClick={()=>{setData({atd:null,forwarder:"",tracking:"",initiator:""});setAddRow(false)}}>Cancel</button>
        </div>
    </div>
};

export default AddTracking