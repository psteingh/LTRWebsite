import React from "react";
import { Link } from "react-router-dom";
import ltrbrand from "../images/ltrbrand.png";

function FooterSmall(){
  return(
  <div className="container">
  <div className="dblue footersmall-sec">
  <div className="list row">

    <div className="footersmalltext-sec">
      <div className="fmesssmall-text">
        Due to limited world-wide server space,
        lawyers & politicians are not allowed to use this site
      </div>
    </div>
    
    <div className="col-md-6">
      <div className="footersmalltext-sec">
        <div className="faboutsmall-text">
        <Link to="/">
          <img className="logosmall-ftr" src={ltrbrand} alt="LTR logo" />
        </Link>
        </div>
      </div>
    </div>

    <div className="col-md-6">
      <div className="footersmallbutton-sec">
        <button className="submit-button">
        <Link to={"/contact"}>
          Contact Us
        </Link>
        </button>
      </div>
    </div>
      
  </div>
  </div>
  </div>

  );
}

export default FooterSmall;