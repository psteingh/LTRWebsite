import React from "react";
import ltrblackbkgrnd from "../images/ltrblackbkgrnd.png";

function LiesMediaTop(){
    return(
        <div className="liestop-container">
          <img className="lies-image" src={ltrblackbkgrnd} alt="LTR Black background" />  
        
        <div className="liestext-centered">
          Media Lies
        </div>
        
        </div>
    );
}
    
export default LiesMediaTop;