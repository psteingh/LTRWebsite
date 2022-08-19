import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";

export default class ProtectedRoute extends Component {
  render() {
    const { component: Test } = this.props;
    console.log("ProtectedRoute.js Test:", Test);

    const isAuthenticated = localStorage.getItem("isAuthenticated");
    console.log("ProtectedRoute.js isAuthenticated:", isAuthenticated);
    
    return (
        <Route
          render={() => (
            isAuthenticated ? <Test />
             : <Redirect to="/" />)} />
    ); } }