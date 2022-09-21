import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class ProtectedRoute extends Component {
  render() {

  const Test = this.props.component;

  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return isAuthenticated ? ( <Test /> ) : (
      <Redirect to={"/aboutusboard"} /> );
} }