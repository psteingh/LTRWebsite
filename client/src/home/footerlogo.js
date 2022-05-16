import React from "react";
import { Link } from "react-router-dom";
import ltrbrand from "../images/ltrbrand.png";

function FooterLogo(){
  return(
  <div className="footerlogo-grid">
    
    <div className="grid-child">
      <div className="footersmalllogo-sec">
        <Link to="/">
          <img className="logologo-ftr" src={ltrbrand} alt="LTR logo" />
        </Link>
      </div>
    </div>
  
  </div>

  );
}

export default FooterLogo;