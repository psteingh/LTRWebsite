import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";

export default class ProtectedRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      currentUser: {
        email: ""}
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    const { component: Component, ...props } = this.props
    
    return (
      <Route {...props}
      render={props => (
        this.state.currentUser ?
        <Component {...props} /> :
        <Redirect to="/" />
      )}
    )
  }
}