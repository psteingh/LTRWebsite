import React, { Component } from "react";
import { Link } from "react-router-dom";
import AboutUsDataService from "../services/aboutus.service";
import AuthService from "../services/auth.service";

export default class AboutUsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveAboutUs = this.retrieveAboutUs.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveAboutUs = this.setActiveAboutUs.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.refreshPage = this.refreshPage.bind(this);

    this.state = {
      aboutus: [],
      currentAboutUs: null,
      currentIndex: -1,
      searchTitle: "",
      currentUser: { email: ""}
    };
  }

  componentDidMount() {
    this.retrieveAboutUs();

    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/" });
    this.setState({ currentUser: currentUser, userReady: true })
  }
  
  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }
  
  retrieveAboutUs() {
    AboutUsDataService.getAll()
      .then(response => {
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
    this.retrieveAboutUs();
    this.setState({
      currentAboutUs: null,
      currentIndex: -1
    });
  }

  setActiveAboutUs(aboutus, index) {
    this.setState({
      currentAboutUs: aboutus,
      currentIndex: index,
    });
  }

  searchTitle() {
    this.setState({
      currentAboutUs: null,
      currentIndex: -1,
    });

    AboutUsDataService.findTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          aboutus: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshPage() {
    window.location.reload(false);
  }

  render() {
    const { searchTitle,
            aboutus,
            currentAboutUs,
            currentIndex,
            currentUser } = this.state;

    return (
      <div className="list row">
        <div className="opake">
          <h3>Only you see this</h3>
        </div>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <h4>List of About Us</h4>
          <ul className="list-group">
            {aboutus &&
              aboutus.map((aboutus, index) => (
              <li
                className={
                "list-group-item " +
                (index === currentIndex ? "active" : "")
                }
                onClick={() => this.setActiveAboutUs(aboutus, index)}
                key={index}>
                
                {aboutus.title}
              </li>
              ))}
          </ul>
          
          <p><button
            className="submit-button">
            <Link to={"/aboutusadd"}>
              Add an About Us </Link>
          </button></p>

          <p><button
            className="submit-button"
              onClick={this.refreshPage}>
              List of About Us
          </button></p>

        </div>

        <div className="col-md-6">
          {currentAboutUs ? (
            <div>
              <h5>About Us details</h5>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentAboutUs.title}
              </div>
              <div>
                <label>
                <strong>Middle:</strong>
                </label>{" "}
                {currentAboutUs.middle}
              </div>
              <div>
                <label>
                <strong>Bottom:</strong>
                </label>{" "}
                {currentAboutUs.bottom}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentAboutUs.published ? "Public" : "Private"}
              </div>
              <button className="submit-button">
                <Link to={"/aboutus/" + currentAboutUs.id}>
                  Edit </Link>
              </button>            
            </div>
          ) : (
            <div>
              <br />
              <p>Click on an About Us for details</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}