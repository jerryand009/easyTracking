import React,{useEffect,useState} from 'react'
import {db_Update, db_FindById, db_Open} from "../../db/db";
import dateFormat from '../../helper/dateFormat'
const dbName = "defaultDB";
const expressStore = "expressShipment";

const Edit = ({editRowId,setEditRowId,getTableData,popMsg})=>{
    const [data,setData] = useState();
    useEffect(()=>{
        getData();
    },[editRowId]);
    const getData = ()=>{
        if (editRowId){
            db_Open(dbName,expressStore).then(db=>{
                return db_FindById(db,expressStore,editRowId);
            }).then(res=>{
                setData(res)
            })
        }
    };
    const newdata = (k,value)=>{

        let inputList = document.getElementsByClassName("editDiv")[0].querySelectorAll("input");
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
        obj["id"] = data["id"];
        if (data.hasOwnProperty("pieces")){obj["pieces"] = data["pieces"] }
        if (data.hasOwnProperty("checkPoints")){obj["checkPoints"] = data["checkPoints"] }
        if (data.hasOwnProperty("responseErrors")){obj["responseErrors"] = data["responseErrors"] }
        if (data.hasOwnProperty("timestamp")){obj["timestamp"] = new Date() }
        setData(obj);
    };
    const updateDb = ()=>{
        console.log(data);
        db_Open(dbName,expressStore).then(db=>{
            return db_Update(db,expressStore,data);
        }).then(res=>{
            console.log("更新数据库成功");
            popMsg("success","Edit success");
            setEditRowId("");
            getTableData();
        })
    };
    return <div className={editRowId?"editDiv":"displayNone"} >
            {data && Object.keys(data).map((k,index)=>{
                if (k!=="id" && k!=="pieces" && k!=="checkPoints" && k!=="responseErrors" && k!=="timestamp"){
                    return  <div className="input-group input-group-sm mb-3" key={index}>
                        <div className="input-group-prepend">
                            <span className="input-group-text" id={k}>{k}</span>
                        </div>
                        {
                            (k==="atd" || k==="ata" || k==="eta" || k === "atd")?
                            <input type="date" className="form-control" data-k={k} value={dateFormat("YYYY-mm-dd",data[k])==="1970-01-01"?"":dateFormat("YYYY-mm-dd",data[k])} onChange={(e)=>{newdata(k,e.target.value)}} />
                            :
                            <input type="text" className="form-control" data-k={k} value={data[k]||""} onChange={(e)=>{newdata(k,e.target.value)}} />
                        }
                    </div>
                }
            })}
                <div className="float-right mb-2">
                    <button type="button" className="btn btn-sm btn-outline-primary" onClick={()=>{updateDb()}}>Confirm</button>
                    <button type="button" className="btn btn-sm btn-outline-primary" onClick={()=>{getData()}}>Reset</button>
                    <button type="button" className="btn btn-sm btn-outline-primary" onClick={()=>{setData("");setEditRowId("")}}>Cancel</button>
                </div>
        </div>
};
export default Edit