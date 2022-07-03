import React, { Component } from "react";
import BibleBoardService from "../services/bibleboard.service";
import UserService from "../services/user.service";

import FooterLogo from "../home/footerlogo";

export default class BibleBoard extends Component {
  constructor(props) {
    super(props);
    this.retrievePublishedLiesBible = this.retrievePublishedLiesBible.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveLieBible = this.setActiveLieBible.bind(this);

    this.state = {
      liesbible: [],
      currentIndex: -1,
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

  setActiveLtrLie(index) {
    this.setState({
      currentIndex: index,
    });
  }

  render() {
    const { liesbible } = this.state;

    return (
    <div className="container">
      <div>
        <div className="opake">
          <h3>{this.state.content}</h3>
        </div>

          <h4>Biblical Lies</h4>

          <ul className="lierboard-group">
            {liesbible &&
              liesbible.map((liebible, index) => (
              <li className="lierboard-group-item" key={index}>
                
                <div className="lbname">Title: {liesbible.title}</div>

                <div className="lbsubject">Middle: {liesbible.middle}</div>
                
                <div className="lbstuff">Bottom: {liesbible.bottom}</div>
                
              </li>
              ))}
          </ul>

      </div>

      <FooterLogo />

    </div>
    );
  }
}