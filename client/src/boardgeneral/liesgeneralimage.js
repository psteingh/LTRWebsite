import React from "react";
import ltrliestruth from "../images/ltrliestruth.png"

function LiesGeneralImage(){
    return(
        <div className="liestop-container">
          <img className="liesab-image" src={ltrliestruth} alt="LTR Lies Truth" />  
        
        <div className="liestext-centered">
          General Lies
        </div>
        
        </div>
    );
}
    
export default LiesGeneralImage;