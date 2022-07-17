import React, { Component } from "react";

import AuthService from "../services/auth.service";

import Footer from "../home/footer";

export default class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      currentUser: { email: ""}
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    // const { currentUser } = this.state;

    return (
      <div className="container">

        <h3>Admin component</h3>
        
        {/* <p><strong>Email:</strong>{" "}
          {currentUser.email}</p> */}

        <Footer />
      </div>
    );
  }
}