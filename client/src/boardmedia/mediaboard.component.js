import React, { Component } from "react";
import MediaBoardService from "../services/mediaboard.service";
import UserService from "../services/user.service";

import LiesMediaImage from "./liesmediaimage";
import AboutLiesNavBar from "../boardaboutlies/aboutliesnavbar";
import LiesMediaTop from "./liesmediatop";

export default class LiesMediaComponent extends Component {
  constructor(props) {
    super(props);
    this.retrievePublishedLiesMedia = this.retrievePublishedLiesMedia.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveLieMedia = this.setActiveLieMedia.bind(this);

    this.state = {
      liesmedia: [],
      currentIndex: -1,
      content: ""
    };
  }

  componentDidMount() {
    this.retrievePublishedLiesMedia();

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

  retrievePublishedLiesMedia() {
    MediaBoardService.getAllPublished().then(
      response => {
        this.setState({
          liesmedia: response.data,
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

  setActiveLieMedia(index) {
    this.setState({
      currentIndex: index,
    });
  }

  render() {
    const { liesmedia } = this.state;

    return (
      <div className="container">
        <LiesMediaImage />
        <AboutLiesNavBar />
        <LiesMediaTop />

        <ul className="board-group">
          {liesmedia &&
            liesmedia.map((liemedia, index) => (
              <li className="board-group-item" key={index}>
                
                <div className="lies-title">{liemedia.title}</div>

                <div className="lies-mid">{liemedia.middle}</div>
                
                <div className="lies-bottom">{liemedia.bottom}</div>
                
              </li>
              ))}
        </ul>

      </div>
    );
  }
}