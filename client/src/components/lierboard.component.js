import React, { Component } from "react";
import { Link } from "react-router-dom";
import LtrLieDataService from "../services/ltrlie.service";
// import UserService from "../services/user.service";

export default class LierBoard extends Component {
  constructor(props) {
    super(props);
    this.retrievePublishedLtrLies = this.retrievePublishedLtrLies.bind(this);

    this.state = {
      ltrlies: [],
      currentLtrLie: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrievePublishedLtrLies();

    // UserService.getPublicContent().then(
    //   response => {
    //     this.setState({
    //       content: response.data
    //     });
    //   },
    //   error => {
    //     this.setState({
    //       content:
    //         (error.response && error.response.data) ||
    //         error.message ||
    //         error.toString()
    //     });
    //   }
    // );
  }

  retrievePublishedLtrLies() {
    LtrLieDataService.getAllPublished()
      .then(response => {
        this.setState({
          ltrlies: response.data,
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    // const { ltrlies } = this.state;

    return (
      <div className="container">
        {/* <div className="opake">
          <h3>{this.state.content}</h3>
        </div> */}

        <div className="col-md-6">
          <h4>Lies made Public</h4>

          {/* <div>{this.state.name}</div>
          
          <div>{this.state.ltrlies}</div> */}
          
          {/* <div>{ltrlies.name}</div> */}

          <p><button className="submit-button">
            <Link to={"/"}>
              LTR
            </Link></button></p>

        </div>

      </div>
    );
  }
}