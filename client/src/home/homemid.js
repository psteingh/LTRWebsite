import React from "react";
import { Link } from "react-router-dom";
import ltrcatalog from "../images/ltrcatalog.png";
import ltrvault from "../images/ltrvault.png";

function HomeMid(){
    return(
        <div className="grid-container">
        <div className="grid-child">
            <Link to={"/lierboard"}>
            <h1 className="cd-header">Lier Board</h1>
            <div className="cd-text">Public ...see lies Users have made public</div>
            <img className="cd-image" src={ltrcatalog} alt="LTR Catalog" />
            </Link>
        </div>
        <div className="grid-child">
            <Link to={"/login"}>
            <h1 className="cd-header">List of Lies</h1>
            <div className="cd-text">Private ...Users can store & track their lies</div>
            <img className="cd-image" src={ltrvault} alt="LTR Vault" />
            </Link>
        </div>
        
        </div>
    );
}
    
export default HomeMid;