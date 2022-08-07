import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";

export default class ProtectedRoute extends Component {

  render() {
    const { component: Component, ...props } = this.props;
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    console.log("ProtectedRoute.js, this:", isAuthenticated);
    
    return (
      <div>
      
        <Route {...props}
          render={props => ( isAuthenticated ?
            <Component {...props} /> :
            <Redirect to="/" />
          )} />

      </div>
    )
  }
}