import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";

export default class ProtectedRoute extends Component {
  render() {
    const { component: Component } = this.props;
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    console.log("ProtectedRoute.js", isAuthenticated);
    
    return (
        <Route exact path="/admin"
          render={() => (isAuthenticated ?
            <Component /> :
            <Redirect to="/login" />
          )} />
  )}}