import React,{useEffect} from 'react'
import classnames from 'classnames'
const Toast = ({toastDict,toggleToast,hideMsg})=>{
    const msg = toastDict.msg;
    const type = toastDict.type;
    const visable = toggleToast;
    const classN = {
        primary:"alert alert-primary",
        secondary:"alert alert-secondary",
        success:"alert alert-success",
        error:"alert alert-danger",
        warning:"alert alert-warning",
        info:"alert alert-info",
        light:"alert alert-light",
        dark:"alert alert-dark",
    }[type];
    useEffect(()=>{
        toggleDiv(visable);
        let nid = setTimeout(()=>{
            toggleDiv(false)
        },3000);
        return ()=>{
            clearTimeout(nid);
        }
    },[toggleToast]);
    const toggleDiv = (visable)=>{
        let toast = document.getElementById("alertDiv");
        if (visable){
            toast.style.opacity=1;
            toast.style.zIndex=9999;
        }else{
            toast.style.opacity=0;
            toast.style.zIndex=-1;
            hideMsg();
        }
    };
    return <>
            <div className={classnames(classN,"align-items-baseline")} role="alert" id="alertDiv">
                <strong>{msg?type.toString().toUpperCase():""}!</strong>
                <span className="ml-2 align-content-center mr-2">{msg}</span>
                <span className="float-right pt-0 pb-0 pointer" onClick={()=>toggleDiv(false)}>
                    &times;
                </span>
            </div>
        </>
};
export default Toast