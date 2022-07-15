import React, { Component } from "react";

import UserService from "../services/user.service";

import LiesTop from "./liestop";
import LiesNavBar from "./liesnavbar";
import LiesAbout from "./liesabout";

export default class Lies extends Component {
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
        <LiesTop />
        <LiesNavBar />
        <LiesAbout />
      </div>
    );
  }
}