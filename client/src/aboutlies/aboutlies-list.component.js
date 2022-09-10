import React, { Component } from "react";
import { Link } from "react-router-dom";
import AboutLiesDataService from "../services/aboutlies.service";
import AuthService from "../services/auth.service";

export default class AboutLiesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveAboutLies = this.retrieveAboutLies.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveAboutLies = this.setActiveAboutLies.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.refreshPage = this.refreshPage.bind(this);

    this.state = {
      aboutlies: [],
      currentAboutLies: null,
      currentIndex: -1,
      searchTitle: "",
      currentUser: { email: ""}
    };
  }

  componentDidMount() {
    this.retrieveAboutLies();

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
  
  retrieveAboutLies() {
    AboutLiesDataService.getAll()
      .then(response => {
        this.setState({
          aboutlies: response.data,
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveAboutLies();
    this.setState({
      currentAboutLies: null,
      currentIndex: -1
    });
  }

  setActiveAboutLies(aboutlies, index) {
    this.setState({
      currentAboutLies: aboutlies,
      currentIndex: index,
    });
  }

  searchTitle() {
    this.setState({
      currentAboutLies: null,
      currentIndex: -1,
    });

    AboutLiesDataService.findTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          aboutlies: response.data
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
            aboutlies,
            currentAboutLies,
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
          <h4>List of About Lies</h4>
          <ul className="list-group">
            {aboutlies &&
              aboutlies.map((aboutlies, index) => (
              <li
                className={
                "list-group-item " +
                (index === currentIndex ? "active" : "")
                }
                onClick={() => this.setActiveAboutLies(aboutlies, index)}
                key={index}>
                
                {aboutlies.title}
              </li>
              ))}
          </ul>
          
          <p><button
            className="submit-button">
            <Link to={"/aboutliesadd"}>
              Add an About Lies </Link>
          </button></p>

          <p><button
            className="submit-button"
              onClick={this.refreshPage}>
              List of About Lies
          </button></p>

        </div>

        <div className="col-md-6">
          {currentAboutLies ? (
            <div>
              <h5>About Lies details</h5>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentAboutLies.title}
              </div>
              <div>
                <label>
                <strong>Middle:</strong>
                </label>{" "}
                {currentAboutLies.middle}
              </div>
              <div>
                <label>
                <strong>Bottom:</strong>
                </label>{" "}
                {currentAboutLies.bottom}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentAboutLies.published ? "Public" : "Private"}
              </div>
              <button className="submit-button">
                <Link to={"/aboutlies/" + currentAboutLies.id}>
                  Edit </Link>
              </button>            
            </div>
          ) : (
            <div>
              <br />
              <p>Click on an About Lies for details</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}