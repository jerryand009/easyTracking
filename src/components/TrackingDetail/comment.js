import React,{useState,useEffect} from 'react'
const Comment = ({msg,saveComment})=>{
    const [value,setValue]=useState();
    useEffect(()=>{
        setValue(msg)
    },[msg]);
    return <>
        <div className="h6 mt-2">Comment:</div>
        <div className="row">
            <div className="col-10">
                <textarea value={value} rows={5} cols={95} onChange={(e)=>{setValue(e.target.value)}}/>
            </div>
            <div className="col-2">
                <div className="d-flex flex-column justify-content-between align-items-center">
                    <button type="button" className="btn btn-sm btn-outline-primary w-75" onClick={()=>{setValue("")}}>Clear</button>
                    <button type="button" className="btn btn-sm btn-outline-primary w-75" onClick={()=>{setValue(msg)}}>Reset</button>
                    <button type="button" className="btn btn-sm btn-outline-primary w-75" onClick={()=>{saveComment(value)}}>Save</button>
                </div>
            </div>
        </div>
    </>
};
export default Comment