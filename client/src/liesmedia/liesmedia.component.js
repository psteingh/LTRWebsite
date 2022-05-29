import React, { Component } from "react";

import UserService from "../services/user.service";

import LiesGeneralTop from "./liesgentop";
import LiesNavBar from "../lies/liesnavbar";
import LiesGeneral from "./liesgeneral";

export default class LiesGeneralComponent extends Component {
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
        <LiesGeneralTop />
        <LiesNavBar />
        <LiesGeneral />
      </div>
    );
  }
}