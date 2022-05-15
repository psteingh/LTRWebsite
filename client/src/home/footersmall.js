import React from "react";
import { Link } from "react-router-dom";
import ltrbrand from "../images/ltrbrand.png";

function FooterSmall(){
  return(
  <div className="footersmall-grid">
    
    <div className="grid-child">
      <div className="footersmalllogo-sec">
        <Link to="/">
          <img className="logosmall-ftr" src={ltrbrand} alt="LTR logo" />
        </Link>
      </div>
    </div>

    <div className="grid-child">
      <div className="footersmallbutton-sec">
        <button className="submit-button">
        <Link to={"/contact"}>
          Contact Us
        </Link>
        </button>
      </div>
    </div>
      
  </div>

  );
}

export default FooterSmall;