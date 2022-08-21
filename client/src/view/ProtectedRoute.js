import React, { Component } from "react";
// import { Redirect } from "react-router-dom";

import Admin from "../view/admin.component";
import Contact from "../home/contact";

export default class ProtectedRoute extends Component {
  render() {
  // const Test = this.props.component;
  // console.log("ProtectedRoute.js Component:", Component);

  const isAuthenticated = localStorage.getItem("isAuthenticated");
  console.log("ProtectedRoute.js isAuthenticated:", isAuthenticated);

  return ( isAuthenticated ? ( <Contact /> ) : (
      <Admin /> ))
} }