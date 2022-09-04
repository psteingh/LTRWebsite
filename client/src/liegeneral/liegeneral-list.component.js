import React, { Component } from "react";
import { Link } from "react-router-dom";
import LieGeneralDataService from "../services/liegeneral.service";
import AuthService from "../services/auth.service";

export default class LieGeneralList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveLiesGeneral = this.retrieveLiesGeneral.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveLieGeneral = this.setActiveLieGeneral.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.refreshPage = this.refreshPage.bind(this);

    this.state = {
      liesgeneral: [],
      currentLieGeneral: null,
      currentIndex: -1,
      searchTitle: "",
      currentUser: { email: ""}
    };
  }

  componentDidMount() {
    this.retrieveLiesGeneral();

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
  
  retrieveLiesGeneral() {
    LieGeneralDataService.getAll()
      .then(response => {
        this.setState({
          liesgeneral: response.data,
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveLiesGeneral();
    this.setState({
      currentLieGeneral: null,
      currentIndex: -1
    });
  }

  setActiveLieGeneral(liegeneral, index) {
    this.setState({
      currentLieGeneral: liegeneral,
      currentIndex: index,
    });
  }

  searchTitle() {
    this.setState({
      currentLieGeneral: null,
      currentIndex: -1,
    });

    LieGeneralDataService.findTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          liesgeneral: response.data
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
            liesgeneral,
            currentLieGeneral,
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
          <h4>List of General Lies</h4>
          <ul className="list-group">
            {liesgeneral &&
              liesgeneral.map((liegeneral, index) => (
              <li
                className={
                "list-group-item " +
                (index === currentIndex ? "active" : "")
                }
                onClick={() => this.setActiveLieGeneral(liegeneral, index)}
                key={index}>
                
                {liegeneral.title}
              </li>
              ))}
          </ul>
          
          <p><button
            className="submit-button">
            <Link to={"/liesgeneraladd"}>
              Add a General Lie </Link>
          </button></p>

          <p><button
            className="submit-button"
              onClick={this.refreshPage}>
              List of General Lies
          </button></p>

        </div>

        <div className="col-md-6">
          {currentLieGeneral ? (
            <div>
              <h5>General Lie details</h5>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentLieGeneral.title}
              </div>
              <div>
                <label>
                <strong>Middle:</strong>
                </label>{" "}
                {currentLieGeneral.middle}
              </div>
              <div>
                <label>
                <strong>Bottom:</strong>
                </label>{" "}
                {currentLieGeneral.bottom}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentLieGeneral.published ? "Public" : "Private"}
              </div>
              <button className="submit-button">
                <Link to={"/liesgeneral/" + currentLieGeneral.id}>
                  Edit </Link>
              </button>            
            </div>
          ) : (
            <div>
              <br />
              <p>Click on General Lie for details</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}