import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class ProtectedRoute extends Component {
  
  render() {
    const Component = this.props.component;
    console.log("ProtectedRoute.js Component:", Component);

    const isAuthenticated = localStorage.getItem("isAuthenticated");
    console.log("ProtectedRoute.js isAuthenticated:", isAuthenticated);
    
    return isAuthenticated ? ( <Component /> ) : (
            <Redirect to={{ pathname: '/login' }} /> );
  }
}