import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";

export default class ProtectedRoute extends Component {

  render() {
    const { component: Component, ...restOfProps } = this.props;
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    console.log("ProtectedRoute.js", isAuthenticated);
    
    return (
      <div>
      
        <Route {...restOfProps}
          render={(props) => ( isAuthenticated ?
            <Component {...props} /> :
            <Redirect to="/" />
          )} />

      </div>
    );
  }
}