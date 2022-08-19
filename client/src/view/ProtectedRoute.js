import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";

export default class ProtectedRoute extends Component {
  render() {
    const { component: Component } = this.props;
    console.log("ProtectedRoute.js Component:", Component);

    const isAuthenticated = localStorage.getItem("isAuthenticated");
    console.log("ProtectedRoute.js isAuthenticated:", isAuthenticated);
    
    return (
        <Route
          render={() => (
            isAuthenticated ? <Component />
             : <Redirect to="/" />)} />
    ); } }