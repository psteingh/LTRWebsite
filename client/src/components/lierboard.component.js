import React, { Component } from "react";

import UserService from "../services/user.service";
import LtrLieDataService from "../services/ltrlie.service";

import LieList from "../home/lielist";
export default class LierBoard extends Component {
  constructor(props) {
    super(props);
    this.getPublishedLtrLies = this.getPublishedLtrLies.bind(this);

    this.state = {
      ltrlies: [],
      // content: "",
      currentLtrLie: null,
      currentIndex: -1,
      // id: null,
      // name: "",
      // subject: "",
      // stuff: "",
      // published: false,
    };
  }

  componentDidMount() {
    // this.getPublishedLtrLies();

    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data,
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

  getPublishedLtrLies() {
    LtrLieDataService.getAllPublished()
      .then(response => {
        this.setState({
          ltrlies: response.data,
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  setActiveLtrLie(ltrlie, index, published) {
    this.setState({
      currentLtrLie: ltrlie,
      currentIndex: index,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="notice-sec opake">
          <h3>{this.state.content}</h3>
        </div>
        <LieList />
      </div>
    );
  }
}