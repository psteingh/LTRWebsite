import React, { Component } from "react";
import { Link } from "react-router-dom";
import LieMediaDataService from "../services/liemedia.service";
import AuthService from "../services/auth.service";

export default class LieMediaList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveLiesMedia = this.retrieveLiesMedia.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveLieMedia = this.setActiveLieMedia.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.refreshPage = this.refreshPage.bind(this);

    this.state = {
      liesmedia: [],
      currentLieMedia: null,
      currentIndex: -1,
      searchTitle: "",
      currentUser: { email: ""}
    };
  }

  componentDidMount() {
    this.retrieveLiesMedia();

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
  
  retrieveLiesMedia() {
    LieMediaDataService.getAll()
      .then(response => {
        this.setState({
          liesmedia: response.data,
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveLiesMedia();
    this.setState({
      currentLieMedia: null,
      currentIndex: -1
    });
  }

  setActiveLieMedia(liemedia, index) {
    this.setState({
      currentLieMedia: liemedia,
      currentIndex: index,
    });
  }

  searchTitle() {
    this.setState({
      currentLieMedia: null,
      currentIndex: -1,
    });

    LieMediaDataService.findTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          liesmedia: response.data
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
            liesmedia,
            currentLieMedia,
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
          <h4>List of Media Lies</h4>
          <ul className="list-group">
            {liesmedia &&
              liesmedia.map((liemedia, index) => (
              <li
                className={
                "list-group-item " +
                (index === currentIndex ? "active" : "")
                }
                onClick={() => this.setActiveLieMedia(liemedia, index)}
                key={index}>
                
                {liemedia.title}
              </li>
              ))}
          </ul>
          
          <p><button
            className="submit-button">
            <Link to={"/liesmediaadd"}>
              Add a Media Lie </Link>
          </button></p>

          <p><button
            className="submit-button"
              onClick={this.refreshPage}>
              List of Media Lies
          </button></p>

        </div>

        <div className="col-md-6">
          {currentLieMedia ? (
            <div>
              <h5>Media Lie details</h5>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentLieMedia.title}
              </div>
              <div>
                <label>
                <strong>Middle:</strong>
                </label>{" "}
                {currentLieMedia.middle}
              </div>
              <div>
                <label>
                <strong>Bottom:</strong>
                </label>{" "}
                {currentLieMedia.bottom}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentLieMedia.published ? "Public" : "Private"}
              </div>
              <button className="submit-button">
                <Link to={"/liesmedia/" + currentLieMedia.id}>
                  Edit </Link>
              </button>            
            </div>
          ) : (
            <div>
              <br />
              <p>Click on Media Lie for details</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}