import React, { Component } from "react";
import { Link } from "react-router-dom";
import BibleBoardService from "../services/bibleboard.service";
import UserService from "../services/user.service";

import LiesBibleImage from "./liesbibleimage";
import LiesNavBar from "../aboutlies/liesnavbar";
import LiesBibleTop from "./liesbibletop";

export default class BibleBoard extends Component {
  constructor(props) {
    super(props);
    this.retrievePublishedLiesBible = this.retrievePublishedLiesBible.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveLieBible = this.setActiveLieBible.bind(this);

    this.state = {
      liesbible: [],
      currentIndex: -1,
      content: ""
    };
  }

  componentDidMount() {
    this.retrievePublishedLiesBible();

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

  retrievePublishedLiesBible() {
    BibleBoardService.getAllPublished().then(
      response => {
        this.setState({
          liesbible: response.data,
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

  setActiveLieBible(index) {
    this.setState({
      currentIndex: index,
    });
  }

  render() {
    const { liesbible } = this.state;

    return (
    <div className="container">
      <LiesBibleImage />
      <LiesNavBar />
      <LiesBibleTop />

        {/* hard coded - to be deleted */}
        <ul className="board-group">
          <li className="board-group-item">
            <div className="lies-title">
              Revelation 14:5</div>
            <div className="lies-mid">
              No lie was found in their mouths;</div>
            <div className="lies-bottom">
              they are blameless.</div>
          </li>
        </ul>

          <ul className="board-group">
            {liesbible &&
              liesbible.map((liebible, index) => (
              <li className="board-group-item" key={index}>
                
                <div className="lies-title">{liebible.title}</div>

                <div className="lies-mid">{liebible.middle}</div>
                
                <div className="lies-bottom">{liebible.bottom}</div>
                
              </li>
              ))}
          </ul>

          <p><button
            className="submit-button">
            <Link to={"/admin"}>
            Back to admin</Link>
          </button></p>


    </div>
    );
  }
}