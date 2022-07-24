import React, { Component } from "react";
import { Link } from "react-router-dom";
import LtrLieDataService from "../services/ltrlie.service";
import AuthService from "../services/auth.service";

export default class LtrLieList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveLtrLies = this.retrieveLtrLies.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveLtrLie = this.setActiveLtrLie.bind(this);
    this.searchName = this.searchName.bind(this);
    this.refreshPage = this.refreshPage.bind(this);

    this.state = {
      ltrlies: [],
      currentLtrLie: null,
      currentIndex: -1,
      searchName: "",
      currentUser: { email: ""}
    };
  }

  componentDidMount() {
    this.retrieveLtrLies();

    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/" });
    this.setState({ currentUser: currentUser, userReady: true })
  }
  
  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }
  
  retrieveLtrLies() {
    LtrLieDataService.getAll()
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

  searchName() {
    this.setState({
      currentLtrLie: null,
      currentIndex: -1,
    });

    LtrLieDataService.findName(this.state.searchName)
      .then(response => {
        this.setState({
          ltrlies: response.data
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
    const { searchName,
            ltrlies,
            currentLtrLie,
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
              placeholder="Search by name"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}
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

        {/* <p><button
            className="submit-button">
            <Link to={"/liesbible"}>
              Bible List </Link>
          </button></p> */}

      </div>
    );
  }
}