import React, { Component } from "react";
import AboutLiesBoardService from "../services/aboutliesboard.service";
import UserService from "../services/user.service";

import AboutLiesImage from "./aboutliesimage";
import AboutLiesNavBar from "./aboutliesnavbar";
import AboutLiesTop from "./aboutliestop";

export default class AboutLiesComponent extends Component {
  constructor(props) {
    super(props);
    this.retrievePublishedAboutLies = this.retrievePublishedAboutLies.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveAboutLies = this.setActiveAboutLies.bind(this);

    this.state = {
      aboutlies: [],
      currentIndex: -1,
      content: ""
    };
  }

  componentDidMount() {
    this.retrievePublishedAboutLies();

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

  retrievePublishedAboutLies() {
    AboutLiesBoardService.getAllPublished().then(
      response => {
        this.setState({
          aboutlies: response.data,
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

  setActiveAboutLies(index) {
    this.setState({
      currentIndex: index,
    });
  }

  render() {
    const { aboutlies } = this.state;

    return (
      <div className="container">
        <AboutLiesImage />
        <AboutLiesNavBar />
        <AboutLiesTop />

        <ul className="board-group">
          {aboutlies &&
            aboutlies.map((aboutlies, index) => (
              <li className="board-group-item" key={index}>
                
                <div className="lies-title">{aboutlies.title}</div>

                <div className="lies-mid">{aboutlies.middle}</div>
                
                <div className="lies-bottom">{aboutlies.bottom}</div>
                
              </li>
              ))}
        </ul>

      </div>
    );
  }
}