import React from "react";
import ltrbible from "../images/ltrbible.png";

function LiesBibleTop(){
    return(
        <div className="liestop-container">
          <img className="liesab-image" src={ltrbible} alt="LTR Bible" />  
        
        <div className="liestext-centered">
          Biblical Lies
        </div>
        
        </div>
    );
}
    
export default LiesBibleTop;