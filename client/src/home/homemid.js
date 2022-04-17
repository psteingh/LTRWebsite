import React from "react";
import ltrcatalog from "../images/ltrcatalog.png";
import ltrvault from "../images/ltrvault.png";
import ltrvideos from "../images/ltrvideos.png";

function HomeMid(){
    return(
        <div className="grid-container">
        <div className="grid-child">
            <h1>Catalog</h1>
            <div>Public</div>
            <img className="cd-image" src={ltrcatalog} alt="LTR Catalog" />
        </div>
        <div className="grid-child"><img className="cd-image" src={ltrvault} alt="LTR Vault" />
        </div>
        <div className="grid-child"><img className="cd-image" src={ltrvideos} alt="LTR Videos" />
        </div>
        </div>
    );
}
    
export default HomeMid;