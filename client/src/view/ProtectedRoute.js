import React, { Component } from "react";
// import { Redirect } from "react-router-dom";

import Admin from "../view/admin.component";
import Contact from "../home/contact";

  // const Test = this.props.component;
    // console.log("ProtectedRoute.js Component:", Component);

    const isAuthenticated = localStorage.getItem("isAuthenticated");
    console.log("ProtectedRoute.js isAuthenticated:", isAuthenticated);

export default class ProtectedRoute extends Component {
  
  render() {

    if ( !isAuthenticated ) {
      return <Contact /> }
      return <Admin /> }
}