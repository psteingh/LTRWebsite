import React, { Component } from "react";

import UserService from "../services/user.service";

import AboutTop from "./abouttop";
import AboutNavBar from "./aboutnavbar";
import AboutMission from "./aboutmission";

export default class About extends Component {
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
        <AboutTop />
        <AboutNavBar />
        <AboutMission />
      </div>
    );
  }
}