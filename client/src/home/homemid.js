import React from "react";
import ltrcatalog from "../images/ltrcatalog.png";
import ltrvault from "../images/ltrvault.png";
import ltrvideos from "../images/ltrvideos.png";

function HomeMid(){
    return(
        <div className="grid-container">
        <div className="grid-child">
            <h1 className="cd-header">Lier Board</h1>
            <div className="cd-text">Public ...see other lies, coming soon ...rate & advice</div>
            <img className="cd-image" src={ltrcatalog} alt="LTR Catalog" />
        </div>
        <div className="grid-child">
            <h1 className="cd-header">List of Lies</h1>
            <div className="cd-text">Private ...storing lies, password protected</div>
            <img className="cd-image" src={ltrvault} alt="LTR Vault" />
        </div>
        <div className="grid-child">
            <h1 className="cd-header">Videos</h1>
            <div className="cd-text">Watch ...see lies in action, upload, coming soon</div>
            <img className="cd-image" src={ltrvideos} alt="LTR Videos" />
        </div>
        </div>
    );
}
    
export default HomeMid;