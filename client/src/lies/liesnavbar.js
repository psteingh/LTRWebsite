import React, { Component } from "react";
import { Link } from "react-router-dom";
import ltrbrand from "../images/ltrbrand.png";

class LiesNavbar extends Component {
render() {
    return (
      <div>
        <nav className="blacktowhite navbar liesnavbar-grid">
          
          <Link to={"/"} className="navbar-brand">
          <img className="logo-ftr" src={ltrbrand} alt="LTR logo" />
          </Link>

          <Link to={"/lies"}>
          About Lies
          </Link>

          <Link to={"/liesgeneral"}>
          General
          </Link>

          <Link to={"/liesbible"}>
          Bible
          </Link>

          <Link to={"/liesmedia"}>
          Media
          </Link>

          <Link to={"/contact"}>
          Contact Us
          </Link>

        </nav>
      </div>
    );
}
}

export default LiesNavbar;