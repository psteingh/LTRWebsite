import React, { Component } from "react";

import UserService from "../services/user.service";

import Tophead from "../home/tophead";
import HomeMid from "../home/homemid";
import Footer from "../home/footer";

export default class Home extends Component {
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
        <Tophead />
        <HomeMid />
        <Footer />
      </div>
    );
  }
}