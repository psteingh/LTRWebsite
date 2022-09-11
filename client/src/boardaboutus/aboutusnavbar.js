import React, { Component } from "react";
import { Link } from "react-router-dom";
import ltrbrand from "../images/ltrbrand.png";

class AboutUsNavbar extends Component {
render() {
    return (
      <div>
        <nav className="blacktowhite navbar liesnavbar-grid">
          
          <Link to={"/"} className="navbar-brand">
          <img className="logo-ftr" src={ltrbrand} alt="LTR logo" />
          </Link>

          <Link to={"/aboutusboard"}>
          About Us
          </Link>

          {/* Musings */}

          <Link to={"/contact"}>
          Contact Us
          </Link>

        </nav>
      </div>
    );
}
}

export default AboutUsNavbar;