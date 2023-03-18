import React from "react";
import { Link } from "react-router-dom";
import ltrbrand from "../images/ltrbrand.png";

function Footer(){
  return(
  <footer className="dblue footer-sec">
    
    <div className="footertext-sec">
      <div className="fmess-text">
        Due to limited server space,
        lawyers & politicians are not allowed to use this site
      </div>
    </div>
    <div className="footertext-sec">
      <div className="fabout-text">
        <Link to="/">
          <img className="logo-ftr" src={ltrbrand} alt="LTR logo" />
        </Link>
      </div>
      <div className="footerbutton-sec">
        <button className="submit-button">
        <Link to={"/contact"}>
          Contact Us
        </Link>
        </button>
      </div>
    </div>

  </footer>

  );
}

export default Footer;