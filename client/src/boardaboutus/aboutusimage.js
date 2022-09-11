import React from "react";
import ltrdeceive from "../images/ltrdeceive.png";

function AboutUsImage(){
    return(
        <div className="liestop-container">
          <img className="liesab-image" src={ltrdeceive} alt="LTR Deceive" />  
        
        <div className="liestext-centered">
          About Us
        </div>
        
        </div>
    );
}
    
export default AboutUsImage;