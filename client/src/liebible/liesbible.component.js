import React, { Component } from "react";

import UserService from "../services/user.service";

import LiesBibleTop from "./liesbibtop";
import LiesNavBar from "../lies/liesnavbar";
import LiesBible from "./liesbible";

export default class LiesBibleComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <LiesBibleTop />
        <LiesNavBar />
        <LiesBible />
      </div>
    );
  }
}