import React, { Component } from "react";
import { Link } from "react-router-dom";

import AuthService from "../services/auth.service";

import Footer from "../home/footer";

export default class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      currentUser: AuthService.getCurrentUser(),
      // content: "",
      // currentUser: {
      //   email: ""}
    };
  }

  // componentDidMount() {
  //   const currentUser = AuthService.getCurrentUser();
  //   if (!currentUser) this.setState({ redirect: "/" });
  //   this.setState({ currentUser: currentUser, userReady: true })
  // }

  render() {
    const { currentUser } = this.state;

    return (
      <div className="container">

        <h3>Admin component</h3>
        
        <p>Email:{" "}{currentUser.email}</p>

          <p><button
            className="submit-button">
            <Link to={"/liesbible"}>
            List of Biblical Lies </Link>
          </button></p>

        <Footer />
      </div>
    );
  }
}