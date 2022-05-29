import React from "react";
import ltrblackbkgrnd from "../images/ltrblackbkgrnd.png";

function LiesBibleTop(){
    return(
        <div className="liestop-container">
          <img className="lies-image" src={ltrblackbkgrnd} alt="LTR Black background" />  
        
        <div className="liestext-centered">
          Lies in the Bible
        </div>
        
        </div>
    );
}
    
export default LiesBibleTop;