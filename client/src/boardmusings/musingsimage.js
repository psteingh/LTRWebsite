import React from "react";
import ltrblackbkgrnd from "../images/ltrblackbkgrnd.png";

function MusingsImage(){
    return(
        <div className="liestop-container">
          <img className="liesab-image" src={ltrblackbkgrnd} alt="LTR Black" />  
        
        <div className="liestext-centered">
          Musings
        </div>
        
        </div>
    );
}
    
export default MusingsImage;