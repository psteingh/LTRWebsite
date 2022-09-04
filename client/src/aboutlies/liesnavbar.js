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

          <Link to={"/aboutlies"}>
          About Lies
          </Link>

          <Link to={"/generalboard"}>
          General
          </Link>

          <Link to={"/bibleboard"}>
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