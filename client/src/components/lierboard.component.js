import React, { Component } from "react";
import LierBoardService from "../services/lierboard.service";
import UserService from "../services/user.service";

export default class LierBoard extends Component {
  constructor(props) {
    super(props);
    this.retrievePublishedLtrLies = this.retrievePublishedLtrLies.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveLtrLie = this.setActiveLtrLie.bind(this);

    this.state = {
      ltrlies: [],
      currentLtrLie: null,
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
      currentLtrLie: null,
      currentIndex: -1
    });
  }

  setActiveLtrLie(ltrlie, index) {
    this.setState({
      currentLtrLie: ltrlie,
      currentIndex: index,
    });
  }

  render() {
    const { ltrlies, currentLtrLie, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="opake">
          <h3>{this.state.content}</h3>
        </div>

        <div className="col-md-6">
          <h4>Lies made Public</h4>

          <ul className="list-group">
            {ltrlies &&
              ltrlies.map((ltrlie, index) => (
              <li
                className={
                "list-group-item " +
                (index === currentIndex ? "active" : "")
                }
                onClick={() => this.setActiveLtrLie(ltrlie, index)}
                key={index}>
                
                {ltrlie.name}
              </li>
              ))}
          </ul>
        </div>

        <div className="col-md-6">
          {currentLtrLie ? (
            <div>
              <h5>Lie details</h5>
              <div>
                <div>Name/Stuff: {currentLtrLie.name}, {currentLtrLie.stuff}
                </div>
                <div>Subject: {currentLtrLie.subject}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <br />
              <p>Click on Lie for details</p>
            </div>
          )}
        </div>

      </div>
    );
  }
}