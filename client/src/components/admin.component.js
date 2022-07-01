import React, { Component } from "react";
import UserService from "../services/user.service";
import EventBus from "../services/eventbus";

import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";

export default class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      redirect: null,
      userReady: false,
      currentUser: { email: ""}
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })

    UserService.getAdmin().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 403) {
          EventBus.dispatch("logout");
        }
      }
    );
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        {(this.state.userReady)}
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
      </div>
    );
  }
}