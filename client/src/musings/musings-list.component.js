import React, { Component } from "react";
import { Link } from "react-router-dom";
import MusingsDataService from "../services/musings.service";
import AuthService from "../services/auth.service";

export default class MusingsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveMusings = this.retrieveMusings.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveMusings = this.setActiveMusings.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.refreshPage = this.refreshPage.bind(this);

    this.state = {
      musings: [],
      currentMusings: null,
      currentIndex: -1,
      searchTitle: "",
      currentUser: { email: ""}
    };
  }

  componentDidMount() {
    this.retrieveMusings();

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
  
  retrieveMusings() {
    MusingsDataService.getAll()
      .then(response => {
        this.setState({
          musings: response.data,
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveMusings();
    this.setState({
      currentMusings: null,
      currentIndex: -1
    });
  }

  setActiveMusings(musings, index) {
    this.setState({
      currentMusings: musings,
      currentIndex: index,
    });
  }

  searchTitle() {
    this.setState({
      currentMusings: null,
      currentIndex: -1,
    });

    MusingsDataService.findTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          musings: response.data
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
            musings,
            currentMusings,
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
          <h4>List of Musings</h4>
          <ul className="list-group">
            {musings &&
              musings.map((musings, index) => (
              <li
                className={
                "list-group-item " +
                (index === currentIndex ? "active" : "")
                }
                onClick={() => this.setActiveMusings(musings, index)}
                key={index}>
                
                {musings.title}
              </li>
              ))}
          </ul>
          
          <p><button
            className="submit-button">
            <Link to={"/musingsadd"}>
              Add a Musings </Link>
          </button></p>

          <p><button
            className="submit-button"
              onClick={this.refreshPage}>
              List of Musings
          </button></p>

        </div>

        <div className="col-md-6">
          {currentMusings ? (
            <div>
              <h5>Musings details</h5>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentMusings.title}
              </div>
              <div>
                <label>
                <strong>Middle:</strong>
                </label>{" "}
                {currentMusings.middle}
              </div>
              <div>
                <label>
                <strong>Bottom:</strong>
                </label>{" "}
                {currentMusings.bottom}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentMusings.published ? "Public" : "Private"}
              </div>
              <button className="submit-button">
                <Link to={"/musings/" + currentMusings.id}>
                  Edit </Link>
              </button>            
            </div>
          ) : (
            <div>
              <br />
              <p>Click on a Musings for details</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}