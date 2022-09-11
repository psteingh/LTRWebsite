import React, { Component } from "react";
import { Link } from "react-router-dom";

import AuthService from "../services/auth.service";

export default class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      currentUser: AuthService.getCurrentUser(),
    };
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div className="container">

        <h3>Admin component</h3>
        
        <p>Email:{" "}{currentUser.email}</p>

          <p><button
            className="submit-button">
            <Link to={"/aboutus"}>
            List of About Us </Link>
          </button></p>

          <p><button
            className="submit-button">
            <Link to={"/musings"}>
            List of Musings </Link>
          </button></p>

          <p><button
            className="submit-button">
            <Link to={"/aboutlies"}>
            List of About Lies </Link>
          </button></p>
          
          <p><button
            className="submit-button">
            <Link to={"/liesgeneral"}>
            List of General Lies </Link>
          </button></p>

          <p><button
            className="submit-button">
            <Link to={"/liesbible"}>
            List of Biblical Lies </Link>
          </button></p>

          <p><button
            className="submit-button">
            <Link to={"/liesmedia"}>
            List of Media Lies </Link>
          </button></p>
      
      </div>
    );
  }
}