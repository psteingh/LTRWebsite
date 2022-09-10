import React, { Component } from "react";
import { Link } from "react-router-dom";
import AboutLiesDataService from "../services/aboutlies.service";

export default class AboutLiesUpdate extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeMiddle = this.onChangeMiddle.bind(this);
    this.onChangeBottom = this.onChangeBottom.bind(this);
    this.getAboutLies = this.getAboutLies.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateAboutLies = this.updateAboutLies.bind(this);
    this.deleteAboutLies = this.deleteAboutLies.bind(this);

    this.state = {
      currentAboutLies: {
        id: null,
        title: "",
        middle: "",
        bottom: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getAboutLies(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentAboutLies: {
          ...prevState.currentAboutLies,
          title: title
        }
      };
    });
  }

  onChangeMiddle(e) {
    const middle = e.target.value;
    
    this.setState(prevState => ({
      currentAboutLies: {
        ...prevState.currentAboutLies,
        middle: middle
      }
    }));
  }

  onChangeBottom(e) {
    const bottom = e.target.value;
    
    this.setState(prevState => ({
      currentAboutLies: {
        ...prevState.currentAboutLies,
        bottom: bottom
      }
    }));
  }

  getAboutLies(id) {
    AboutLiesDataService.get(id)
      .then(response => {
        this.setState({
          currentAboutLies: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
 
  updatePublished(status) {
    var data = {
      id: this.state.currentAboutLies.id,
      title: this.state.currentAboutLies.title,
      middle: this.state.currentAboutLies.middle,
      bottom: this.state.currentAboutLies.bottom,
      published: status
    };
    
    AboutLiesDataService.update(this.state.currentAboutLies.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentAboutLies: {
            ...prevState.currentAboutLies,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateAboutLies() {
    AboutLiesDataService.update(
      this.state.currentAboutLies.id,
      this.state.currentAboutLies
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The About Lies was updated successfully"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteAboutLies() {    
    AboutLiesDataService.delete(this.state.currentAboutLies.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/aboutlies')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentAboutLies } = this.state;

    return (
      <div>        
        {currentAboutLies ? (
          <div className="edit-form">
            <h5>About Lies details</h5>
            <form>
              <div className="form-group">
                <label htmlFor="title"><h4>Title</h4></label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentAboutLies.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="middle"><h4>Middle</h4></label>
                <input
                  type="text"
                  className="form-control"
                  id="middle"
                  value={currentAboutLies.middle}
                  onChange={this.onChangeMiddle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="bottom"><h4>Bottom</h4></label>
                <input
                  type="text"
                  className="form-control"
                  id="bottom"
                  value={currentAboutLies.bottom}
                  onChange={this.onChangeBottom}
                />
              </div>
              <div className="form-group">
                <label><h4>Status:</h4></label>
                {currentAboutLies.published ? "Public" : "Private"}
              </div>
            </form>

            {currentAboutLies.published ? (
              <button className="action-button"
                onClick={() => this.updatePublished(false)}
              >
                Private
              </button>
            ) : (
              <button className="submit-button"
                onClick={() => this.updatePublished(true)}
              >
                Public
              </button>
            )}

            <button
              className="action-button"
              onClick={this.deleteAboutLies}>
              
              Delete
            </button>
            
            <button
              type="submit"
              className="submit-button"
              onClick={this.updateAboutLies}>
            
              Update
            </button>
            <p><button
                className="submit-button">
                <Link to={"/aboutlies"}>
                List of About Lies </Link>
              </button></p>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on an About Lies...</p>
          </div>
        )}
      </div>
    );
  }
}