import React, {useState} from 'react'
import dhl_logo from "../../static/img/dhl_logo.jpg";
import fedex_logo from "../../static/img/fedex_logo.jpg";
import ups_logo from "../../static/img/ups_logo.jpg";
import dateFormat from "../../helper/dateFormat";
import classNames from 'classnames'

const {ipcRenderer} = window.require('electron');
const datefmt = "YYYY-mm-dd HH:MM";
const TrackingDetail = ({currentCargo,isLoading,networkError,trackingResult})=>{
    console.log("trackingResult",trackingResult);
    const [showRelatedCargos,setShowRelatedCargos] = useState(true);
    const setHref = (tracking)=>{
        switch (currentCargo.forwarder) {
            case "FEDEX":
                return `https://www.fedex.com/apps/fedextrack/?action=track&tracknumbers=${tracking}&locale=en_US&cntry_code=us`;
            case "DHL":
                return  `http://www.cn.dhl.com/exp-zh/express/tracking.html?AWB=${tracking}&brand=DHL`;
            case "UPS":
                return `https://www.ups.com/track?loc=zh_CN&tracknum=${tracking}&requester=WT/`
        }
    };
    const openURL = (e)=>{
        e.preventDefault();
        let url = e.target.href;
        ipcRenderer.send('open-url', url)
    };
    return (
        !currentCargo || !trackingResult?
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <span className="font-weight-bolder">{
                    networkError?"Network Error,please check the network connection..":
                        isLoading?
                            <span className={"spinner-border spinner-border-sm"}>
                            <span className="sr-only">Loading...</span>
                            </span>
                            :
                            "No cargo selected currently.."}
                </span>
            </div>:
            trackingResult.responseErrors.hasOwnProperty("tracking")?
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <div>
                    <div className="font-weight-bolder mb-5">{trackingResult.responseErrors.tracking}</div>
                    <div className="font-weight-light">{trackingResult.responseErrors.message}</div>
                </div>
            </div>:
        <>
            {/*Tracking Title*/}
            <div className="alert mb-0">
                <div className="d-flex justify-content-between align-items-center">
                    <span className="font-weight-bold">
                        <span className={isLoading?"spinner-border spinner-border-sm":"displayNone"}>
                            <span className="sr-only">Loading...</span>
                        </span>
                        <a href={setHref(currentCargo.tracking)} onClick={(e)=>{openURL(e)}}>{currentCargo.tracking}</a>
                    </span>
                    <span className="font-weight-bold">{trackingResult.status}</span>
                    <img
                        src={currentCargo.forwarder.toLowerCase()==="dhl"?dhl_logo:currentCargo.forwarder.toLowerCase()==="fedex"?fedex_logo:ups_logo}
                        className="rounded float-right"
                        alt={currentCargo.forwarder.toLowerCase()+" Logo"}
                        height="28"
                        width="28"
                    />
                </div>
            </div>
            {/*Details*/}
            <div className="container">
                <div>
                    <div className="d-flex justify-content-lg-around align-items-center">
                        <p>
                            <span className="font-weight-bold w-75">To:</span>
                            <span>{trackingResult.destination}</span>
                        </p>
                        <p>
                            <span className="font-weight-bold w-75">From:</span>
                            <span>{trackingResult.origin}</span>
                        </p>
                    </div>
                    <div className="d-flex justify-content-around align-items-center">
                        {trackingResult.eta?
                            <p><span className="font-weight-bold w-75">ETA:</span> {dateFormat(datefmt,trackingResult.eta)}</p>:
                            <p><span className="font-weight-bold w-75">ATA:</span> {dateFormat(datefmt,trackingResult.ata)}</p>
                        }
                        <p><span className="font-weight-bold w-75">ATD:</span> {dateFormat(datefmt,trackingResult.atd)}</p>
                    </div>
                </div>
                <div className="h6 mt-4 d-flex justify-content-center">Checkpoint for {trackingResult.tracking}:</div>
                <ul className="list-group checkpoint">
                    {trackingResult.checkPoints.map((item,index)=>{
                        return  <li key={index} className="list-group-item d-flex p-2 no-gutters">
                                    <span className={classNames("col-7",index===0?"font-weight-bold":"")}>
                                        {item.status}
                                    </span>
                                    <span className={classNames("col-3",index===0?"font-weight-bold":"")}>
                                                {item.scanLocation}
                                            </span>
                                    <span className={classNames("col-2",index===0?"font-weight-bold":"")}>
                                                {dateFormat(datefmt,item.actDate)}
                                            </span>
                                </li>
                    })}
                </ul>
                <div className="mt-2 d-flex justify-content-center" onClick={()=>{setShowRelatedCargos(!showRelatedCargos)}}>
                    {trackingResult.pieces.length?<span className="h6 pointer">{trackingResult.pieces.length} Piece shipment：</span>: ""}
                </div>
                <ul className="list-group relatedCargos" id="relatedCargos" hidden={showRelatedCargos}>
                    {
                        trackingResult.pieces.map((item,index)=>{
                            return <li key={index} className="list-group-item d-flex p-1 no-gutters">
                                <div className="col-6">
                                    <a href={setHref(item.tracking)} onClick={(e)=>openURL(e)}>{item.tracking}</a>
                                </div>
                                <div className="col-4">{item.status}</div>
                                {
                                    item.ata?
                                        <div className="col-4">ATA: {dateFormat("YYYY-mm-dd",item.ata)}</div>:
                                        <div className="col-4">ETA: {dateFormat("YYYY-mm-dd",item.eta)}</div>
                                }
                            </li>
                        })
                    }
                </ul>
            </div>
        </>
    )
};
export default TrackingDetail