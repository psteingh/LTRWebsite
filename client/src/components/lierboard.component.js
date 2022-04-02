import React, { Component } from "react";

import UserService from "../services/user.service";
import LtrLieDataService from "../services/ltrlie.service";

export default class LierBoard extends Component {
  constructor(props) {
    super(props);
    this.updatePublished = this.updatePublished.bind(this);

    this.state = {
      content: "",
      ltrlies: [],
      currentLtrLie: {
        id: null,
        name: "",
        subject: "",
        stuff: "",
        published: false,
      },
    };
  }

  componentDidMount() {
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

  updatePublished(status) {
    var data = {
      id: this.state.currentLtrLie.id,
      name: this.state.currentLtrLie.name,
      subject: this.state.currentLtrLie.subject,
      stuff: this.state.currentLtrLie.stuff,
      published: status
    }

    LtrLieDataService.update(this.state.currentLtrLie.id, data)
      .then(response => {
        this.setState({
          ltrlies: response.data,
          published: status,
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentLtrLie } = this.state;
    
    return (
      <div className="container">
        
        <div className="notice-sec opake">
          <h3>{this.state.content}</h3>
        </div>

        <div className="col-md-6">
            <div>
              <h5>Lie details</h5>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentLtrLie.name}
              </div>
            </div>
        </div>
      </div>
    );
  }
}