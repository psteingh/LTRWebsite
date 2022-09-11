import React, { Component } from "react";
import AboutUsBoardService from "../services/aboutusboard.service";
import UserService from "../services/user.service";

import AboutUsImage from "./aboutusimage";
import AboutUsNavBar from "./aboutusnavbar";
import AboutUsTop from "./aboutustop";

export default class AboutUsComponent extends Component {
  constructor(props) {
    super(props);
    this.retrievePublishedAboutUs = this.retrievePublishedAboutUs.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveAboutUs = this.setActiveAboutUs.bind(this);

    this.state = {
      aboutus: [],
      currentIndex: -1,
      content: ""
    };
  }

  componentDidMount() {
    this.retrievePublishedAboutUs();

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

  retrievePublishedAboutUs() {
    AboutUsBoardService.getAllPublished().then(
      response => {
        this.setState({
          aboutus: response.data,
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

  setActiveAboutUs(index) {
    this.setState({
      currentIndex: index,
    });
  }

  render() {
    const { aboutus } = this.state;

    return (
      <div className="container">
        <AboutUsImage />
        <AboutUsNavBar />
        <AboutUsTop />

        <ul className="board-group">
          {aboutus &&
            aboutus.map((aboutus, index) => (
              <li className="board-group-item" key={index}>
                
                <div className="lies-title">{aboutus.title}</div>

                <div className="lies-mid">{aboutus.middle}</div>
                
                <div className="lies-bottom">{aboutus.bottom}</div>
                
              </li>
              ))}
        </ul>

      </div>
    );
  }
}