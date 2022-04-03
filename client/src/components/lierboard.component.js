import React, { Component } from "react";

import UserService from "../services/user.service";
import LtrLieDataService from "../services/ltrlie.service";

export default class LierBoard extends Component {
  constructor(props) {
    super(props);
    this.retrieveLtrLies = this.retrieveLtrLies.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveLtrLie = this.setActiveLtrLie.bind(this);
    this.refreshPage = this.refreshPage.bind(this);

    this.state = {
      ltrlies: [],
      // currentLtrLie: null,
      currentIndex: -1,
      content: "",
      currentLtrLie: {
        id: null,
        name: "",
        // subject: "",
        stuff: "",
        published: false,
      },
    };
  }

  componentDidMount() {
    this.retrieveLtrLies();

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

  retrieveLtrLies() {
    LtrLieDataService.getAll()
      .then(response => {
        this.setState({
          ltrlies: response.data,
          published: true,
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
      currentIndex: -1,
    });
  }

  setActiveLtrLie(ltrlie, index) {
    this.setState({
      currentLtrLie: ltrlie,
      currentIndex: index,
    });
  }

  refreshPage() {
    window.location.reload(false);
  }

  render() {
    const { ltrlies, currentLtrLie, currentIndex } = this.state;
    
    return (
      <div className="container">
        
        <div className="notice-sec opake">
          <h3>{this.state.content}</h3>
        </div>

        <div className="col-md-6">
          <h4>List of Lies</h4>
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

                  <div className="lierboard-sec">
                  <p>{ltrlie.name}, {ltrlie.stuff}</p>
                  <p>{ltrlie.subject}{currentLtrLie.published}</p>
                  </div>

              </li>
              ))}
          </ul>

          <p><button className="submit-button"
              onClick={this.refreshPage}>
            List of Lies
          </button></p>
        </div>

      </div>
    );
  }
}