import React, { Component } from "react";

import UserService from "../services/user.service";

import LiesMediaTop from "./liesmedtop";
import LiesNavBar from "../lies/liesnavbar";
import LiesMedia from "./liesmedia";

export default class LiesMediaComponent extends Component {
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
        <LiesMediaTop />
        <LiesNavBar />
        <LiesMedia />
      </div>
    );
  }
}