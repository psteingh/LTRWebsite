import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";

import AuthService from "../services/auth.service";

export default class ProtectedRoute extends Component {
  constructor(props) {
    super(props);
    // this.authLogin = this.authLogin.bind(this);

    this.state = {
    email: "",
    password: "",
    currentUser: AuthService.getCurrentUser(),
    //   // loading: false,
    //   // message: "",
    };
  }

  authLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    if (this.state.email.toLowerCase() === "admin@email.com" && 
    this.state.password === "654321ad") {
      AuthService.login(
        this.state.email,
        this.state.password,
        this.state.currentUser,
        ).then(
        () => {
      // localStorage.setItem("isAuthenticated", "true");
      this.props.history.push("/admin");
      window.location.reload();
    } ) } }

  render() {
    // const { currentUser } = this.state;
    const { component: Component, ...props } = this.props;
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    console.log("ProtectedRoute.js, this:", isAuthenticated);
    
    return (
      <div>
        {/* <p><strong>Email:</strong>{" "}
          {currentUser.email}</p> */}
      
        <Route {...props}
          render={props => ( this.authLogin ?
            <Component {...props} /> :
            <Redirect to="/" />
          )} />

      </div>
    )
  }
}