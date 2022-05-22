import React, { Component } from "react";
import { Link } from "react-router-dom";
import ltrbrand from "../images/ltrbrand.png";

import AuthService from "../services/auth.service";
import EventBus from "../services/eventbus";

class AboutNavbar extends Component {
    constructor(props) {
      super(props);
      this.logOut = this.logOut.bind(this);
  
      this.state = {
        currentUser: undefined,
      };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
    EventBus.on("logout", () => {
        this.logOut();
      });
    }
    componentWillUnmount() {
        EventBus.remove("logout");
      }
      
        logOut() {
          AuthService.logout();
          this.setState({
            currentUser: undefined,
          });
        }

render() {
    return (
      <div>
        <nav className="blacktowhite navbar navbar-expand navbar-dark">
          
          <Link to={"/"} className="navbar-brand">
          <img className="logo-ftr" src={ltrbrand} alt="LTR logo" />
          </Link>

          <Link to={"/contact"}>
          Contact Us
          </Link>

        </nav>
      </div>
    );
}
}

export default AboutNavbar;