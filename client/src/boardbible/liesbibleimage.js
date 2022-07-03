import React from "react";
import ltrbible from "../images/ltrbible.png";

function LiesBibleImage(){
    return(
        <div className="liestop-container">
          <img className="liesab-image" src={ltrbible} alt="LTR Bible" />  
        
        <div className="liestext-centered">
          Biblical Lies
        </div>
        
        </div>
    );
}
    
export default LiesBibleImage;