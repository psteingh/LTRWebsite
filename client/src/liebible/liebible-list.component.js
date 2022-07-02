import React, { Component } from "react";
import { Link } from "react-router-dom";
import LieBibleDataService from "../services/liebible.service";
import AuthService from "../services/auth.service";

export default class LieBibleList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveLiesBible = this.retrieveLiesBible.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveLieBible = this.setActiveLieBible.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.refreshPage = this.refreshPage.bind(this);

    this.state = {
      liesbible: [],
      currentLieBible: null,
      currentIndex: -1,
      searchTitle: "",
      currentUser: { email: ""}
    };
  }

  componentDidMount() {
    this.retrieveLiesBible();

    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }
  
  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }
  
  retrieveLiesBible() {
    LieBibleDataService.getAll()
      .then(response => {
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
    this.retrieveLiesBible();
    this.setState({
      currentLieBible: null,
      currentIndex: -1
    });
  }

  setActiveLieBible(liebible, index) {
    this.setState({
      currentLieBible: liebible,
      currentIndex: index,
    });
  }

  searchTitle() {
    this.setState({
      currentLieBible: null,
      currentIndex: -1,
    });

    LieBibleDataService.findTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          liesbible: response.data
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
            liesbible,
            currentLieBible,
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
                
                {ltrlie.name}
              </li>
              ))}
          </ul>
          
          <p><button
            className="submit-button">
            <Link to={"/add"}>
              Add a Lie </Link>
          </button></p>

          <p><button className="submit-button"
              onClick={this.refreshPage}>
            List of Lies
          </button></p>
        </div>

        <div className="col-md-6">
          {currentLtrLie ? (
            <div>
              <h5>Lie details</h5>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentLtrLie.name}
              </div>
              <div>
                <label>
                <strong>Subject:</strong>
                </label>{" "}
                {currentLtrLie.subject}
              </div>
              <div>
                <label>
                <strong>Stuff:</strong>
                </label>{" "}
                {currentLtrLie.stuff}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentLtrLie.published ? "Public" : "Private"}
              </div>
              <button className="submit-button">
                <Link to={"/ltrlies/" + currentLtrLie.id}>
                  Edit </Link>
              </button>            
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