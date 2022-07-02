import React, { Component } from "react";
import { Link } from "react-router-dom";
import LieBibleDataService from "../services/liebible.service";

export default class LieBibleUpdate extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeMiddle = this.onChangeMiddle.bind(this);
    this.onChangeBottom = this.onChangeBottom.bind(this);
    this.getLieBible = this.getLieBible.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateLieBible = this.updateLieBible.bind(this);
    this.deleteLieBible = this.deleteLieBible.bind(this);

    this.state = {
      currentLieBible: {
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
    this.getLieBible(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentLieBible: {
          ...prevState.currentLieBible,
          title: title
        }
      };
    });
  }

  onChangeMiddle(e) {
    const middle = e.target.value;
    
    this.setState(prevState => ({
      currentLieBible: {
        ...prevState.currentLieBible,
        middle: middle
      }
    }));
  }

  onChangeBottom(e) {
    const bottom = e.target.value;
    
    this.setState(prevState => ({
      currentLieBible: {
        ...prevState.currentLieBible,
        bottom: bottom
      }
    }));
  }

  getLieBible(id) {
    LieBibleDataService.get(id)
      .then(response => {
        this.setState({
          currentLieBible: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
 
  updatePublished(status) {
    var data = {
      id: this.state.currentLieBible.id,
      title: this.state.currentLieBible.title,
      middle: this.state.currentLieBible.middle,
      bottom: this.state.currentLieBible.bottom,
      published: status
    };
    
    LieBibleDataService.update(this.state.currentLieBible.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentLieBible: {
            ...prevState.currentLieBible,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateLieBible() {
    LieBibleDataService.update(
      this.state.currentLieBible.id,
      this.state.currentLieBible
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Biblical Lie was updated successfully"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteLieBible() {    
    LieBibleDataService.delete(this.state.currentLieBible.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/liesbible')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentLieBible } = this.state;

    return (
      <div>        
        {currentLieBible ? (
          <div className="edit-form">
            <h5>Biblical Lie details</h5>
            <form>
              <div className="form-group">
                <label htmlFor="title"><h4>Title</h4></label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentLieBible.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="middle"><h4>Middle</h4></label>
                <input
                  type="text"
                  className="form-control"
                  id="middle"
                  value={currentLieBible.middle}
                  onChange={this.onChangeMiddle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="bottom"><h4>Bottom</h4></label>
                <input
                  type="text"
                  className="form-control"
                  id="bottom"
                  value={currentLieBible.bottom}
                  onChange={this.onChangeBottom}
                />
              </div>
              <div className="form-group">
                <label><h4>Status:</h4></label>
                {currentLieBible.published ? "Public" : "Private"}
              </div>
            </form>

            {currentLieBible.published ? (
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
              onClick={this.deleteLieBible}>
              
              Delete
            </button>
            
            <button
              type="submit"
              className="submit-button"
              onClick={this.updateLieBible}>
            
              Update
            </button>
            <p><button
                className="submit-button">
                <Link to={"/liesbible"}>
                List of Biblical Lies </Link>
              </button></p>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Biblical Lie...</p>
          </div>
        )}
      </div>
    );
  }
}