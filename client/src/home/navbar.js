import React, { Component } from "react";
import { Link } from "react-router-dom";
import ltrbrand from "../images/ltrbrand.png";

import AuthService from "../services/auth.service";
import EventBus from "../services/eventbus";

class Navbar extends Component {
    constructor(props) {
      super(props);
      this.logOut = this.logOut.bind(this);
  
      this.state = {
        email: "",
        password: "",
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

    else if (
      this.state.email.toLowerCase() === "admin@email.com" &&
      this.state.password === "654321ad"
    ) {
      //Signin Success
      localStorage.setItem("isAuthenticated", "true");
      window.location.pathname = "/liesbible";
    }

    EventBus.on("logout", () => {
        this.logOut();
        localStorage.clear();
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
    const { currentUser } = this.state;

    return (
        <div>
        <nav className="dblue navbar navbar-expand navbar-dark">
          
          <Link to={"/"} className="navbar-brand">
          <img className="logo-ftr" src={ltrbrand} alt="LTR logo" />
          </Link>

          <Link to={"/about"} className="navbar-mid">
          About Us
          </Link>

          <Link to={"/lierboard"} className="navbar-mid">
          Lier Board
          </Link>

          <Link to={"/aboutlies"} className="navbar-mid">
          About Lies
          </Link>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
                        
            <li className="nav-item">
              <Link to={"/ltrlies"} className="nav-link">
                List of Lies
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/liesbible"} className="nav-link">
                Bible List
              </Link>
            </li>
            
            <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  Logout
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto navbar-logsign">
            
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                 Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>
    </div>
    );
}
}

export default Navbar;