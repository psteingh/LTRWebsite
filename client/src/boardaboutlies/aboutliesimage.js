import React from "react";
import ltrblackbkgrnd from "../images/ltrblackbkgrnd.png";

function AboutLiesImage(){
    return(
        <div className="liestop-container">
          <img className="liesab-image" src={ltrblackbkgrnd} alt="LTR Black background" />

        <div className="liestext-centered">
          About Lies
        </div>

        </div>
    );
}
    
export default AboutLiesImage;