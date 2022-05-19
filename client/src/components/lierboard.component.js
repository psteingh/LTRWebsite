import React, { Component } from "react";
import LierBoardService from "../services/lierboard.service";
import UserService from "../services/user.service";

import FooterLogo from "../home/footerlogo";

export default class LierBoard extends Component {
  constructor(props) {
    super(props);
    this.retrievePublishedLtrLies = this.retrievePublishedLtrLies.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveLtrLie = this.setActiveLtrLie.bind(this);

    this.state = {
      ltrlies: [],
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrievePublishedLtrLies();

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

  retrievePublishedLtrLies() {
    LierBoardService.getAllPublished().then(
      response => {
        this.setState({
          ltrlies: response.data,
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

  setActiveLtrLie(ltrlie, index) {
    this.setState({
      currentIndex: index,
    });
  }

  render() {
    const { ltrlies } = this.state;

    return (
    <div className="container">
      <div className="lierboard-row">
        <div className="opake">
          <h3>{this.state.content}</h3>
        </div>

          <h4>Lies made Public</h4>

          <ul className="lierboard-group">
            {ltrlies &&
              ltrlies.map((ltrlie, index) => (
              <li className="lierboard-group-item" key={index}>
                
                <div>Name: {ltrlie.name}</div>
                
                <div>Stuff: {ltrlie.stuff}</div>
                
                <div>Subject: {ltrlie.subject}</div>
              
              </li>
              ))}
          </ul>

      </div>

      <FooterLogo />

    </div>
    );
  }
}