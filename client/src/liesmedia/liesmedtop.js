import React from "react";
import ltrmedia from "../images/ltrmedia.png";

function LiesMediaTop(){
    return(
        <div className="liestop-container">
          <img className="liesab-image" src={ltrmedia} alt="LTR Media" />  
        
        <div className="liestext-centered">
          Media Lies
        </div>
        
        </div>
    );
}
    
export default LiesMediaTop;