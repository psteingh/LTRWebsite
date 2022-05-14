import React from "react";
import ltrcatalog from "../images/ltrcatalog.png";
import ltrvault from "../images/ltrvault.png";

function HomeMid(){
    return(
        <div className="grid-container">
        <div className="grid-child">
            <h1 className="cd-header">Lier Board</h1>
            <div className="cd-text">Public ...see list of lies signed up users have made public</div>
            <img className="cd-image" src={ltrcatalog} alt="LTR Catalog" />
        </div>
        <div className="grid-child">
            <h1 className="cd-header">List of Lies</h1>
            <div className="cd-text">Private ...after signing up users can store lies for future reference</div>
            <img className="cd-image" src={ltrvault} alt="LTR Vault" />
        </div>
        
        </div>
    );
}
    
export default HomeMid;