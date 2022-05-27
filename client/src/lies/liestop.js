import React from "react";
import ltrdeceive from "../images/ltrdeceive.png";

function AboutTop(){
    return(
        <div className="abtop-container">
          <img className="ab-image" src={ltrdeceive} alt="LTR Deceive" />  
        
        <div className="abtext-centered">
          About Us
        </div>
        
        </div>
    );
}
    
export default AboutTop;