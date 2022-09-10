import React, { Component } from "react";
import GeneralBoardService from "../services/generalboard.service";
import UserService from "../services/user.service";

import LiesGeneralImage from "./liesgeneralimage";
import AboutLiesNavBar from "../boardaboutlies/aboutliesnavbar";
import LiesGeneralTop from "./liesgeneraltop";

export default class GeneralBoard extends Component {
  constructor(props) {
    super(props);
    this.retrievePublishedLiesGeneral = this.retrievePublishedLiesGeneral.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveLieGeneral = this.setActiveLieGeneral.bind(this);

    this.state = {
      liesgeneral: [],
      currentIndex: -1,
      content: ""
    };
  }

  componentDidMount() {
    this.retrievePublishedLiesGeneral();

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

  retrievePublishedLiesGeneral() {
    GeneralBoardService.getAllPublished().then(
      response => {
        this.setState({
          liesgeneral: response.data,
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

  setActiveLieGeneral(index) {
    this.setState({
      currentIndex: index,
    });
  }

  render() {
    const { liesgeneral } = this.state;

    return (
      <div className="container">
        <LiesGeneralImage />
        <AboutLiesNavBar />
        <LiesGeneralTop />

        <ul className="board-group">
          {liesgeneral &&
            liesgeneral.map((liegeneral, index) => (
              <li className="board-group-item" key={index}>
                
                <div className="lies-title">{liegeneral.title}</div>

                <div className="lies-mid">{liegeneral.middle}</div>
                
                <div className="lies-bottom">{liegeneral.bottom}</div>
                
              </li>
              ))}
        </ul>

      </div>
    );
  }
}