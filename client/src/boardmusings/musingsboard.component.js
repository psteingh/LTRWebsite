import React, { Component } from "react";
import MusingsBoardService from "../services/musingsboard.service";
import UserService from "../services/user.service";

import MusingsImage from "./musingsimage";
import AboutUsNavBar from "../boardaboutus/aboutusnavbar";
import MusingsTop from "./musingstop";

export default class MusingsComponent extends Component {
  constructor(props) {
    super(props);
    this.retrievePublishedMusings = this.retrievePublishedMusings.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveMusings = this.setActiveMusings.bind(this);

    this.state = {
      musings: [],
      currentIndex: -1,
      content: ""
    };
  }

  componentDidMount() {
    this.retrievePublishedMusings();

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

  retrievePublishedMusings() {
    MusingsBoardService.getAllPublished().then(
      response => {
        this.setState({
          musings: response.data,
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  
  refreshList() {
    this.retrieveLtrLies();
    this.setState({
      currentIndex: -1
    });
  }

  setActiveMusings(index) {
    this.setState({
      currentIndex: index,
    });
  }

  render() {
    const { musings } = this.state;

    return (
      <div className="container">
        <MusingsImage />
        <AboutUsNavBar />
        <MusingsTop />

        <ul className="board-group">
          {musings &&
            musings.map((musings, index) => (
              <li className="board-group-item" key={index}>
                
                <div className="lies-title">{musings.title}</div>

                <div className="lies-mid">{musings.middle}</div>
                
                <div className="lies-bottom">{musings.bottom}</div>
                
              </li>
              ))}
        </ul>

      </div>
    );
  }
}