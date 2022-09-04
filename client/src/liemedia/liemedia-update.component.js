import React, { Component } from "react";
import { Link } from "react-router-dom";
import LieMediaDataService from "../services/liemedia.service";

export default class LieMediaUpdate extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeMiddle = this.onChangeMiddle.bind(this);
    this.onChangeBottom = this.onChangeBottom.bind(this);
    this.getLieMedia = this.getLieMedia.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateLieMedia = this.updateLieMedia.bind(this);
    this.deleteLieMedia = this.deleteLieMedia.bind(this);

    this.state = {
      currentLieMedia: {
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
    this.getLieMedia(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentLieMedia: {
          ...prevState.currentLieMedia,
          title: title
        }
      };
    });
  }

  onChangeMiddle(e) {
    const middle = e.target.value;
    
    this.setState(prevState => ({
      currentLieMedia: {
        ...prevState.currentLieMedia,
        middle: middle
      }
    }));
  }

  onChangeBottom(e) {
    const bottom = e.target.value;
    
    this.setState(prevState => ({
      currentLieMedia: {
        ...prevState.currentLieMedia,
        bottom: bottom
      }
    }));
  }

  getLieMedia(id) {
    LieMediaDataService.get(id)
      .then(response => {
        this.setState({
          currentLieMedia: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
 
  updatePublished(status) {
    var data = {
      id: this.state.currentLieMedia.id,
      title: this.state.currentLieMedia.title,
      middle: this.state.currentLieMedia.middle,
      bottom: this.state.currentLieMedia.bottom,
      published: status
    };
    
    LieMediaDataService.update(this.state.currentLieMedia.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentLieMedia: {
            ...prevState.currentLieMedia,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateLieMedia() {
    LieMediaDataService.update(
      this.state.currentLieMedia.id,
      this.state.currentLieMedia
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Media Lie was updated successfully"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteLieMedia() {    
    LieMediaDataService.delete(this.state.currentLieMedia.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/liesmedia')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentLieMedia } = this.state;

    return (
      <div>        
        {currentLieMedia ? (
          <div className="edit-form">
            <h5>Media Lie details</h5>
            <form>
              <div className="form-group">
                <label htmlFor="title"><h4>Title</h4></label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentLieMedia.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="middle"><h4>Middle</h4></label>
                <input
                  type="text"
                  className="form-control"
                  id="middle"
                  value={currentLieMedia.middle}
                  onChange={this.onChangeMiddle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="bottom"><h4>Bottom</h4></label>
                <input
                  type="text"
                  className="form-control"
                  id="bottom"
                  value={currentLieMedia.bottom}
                  onChange={this.onChangeBottom}
                />
              </div>
              <div className="form-group">
                <label><h4>Status:</h4></label>
                {currentLieMedia.published ? "Public" : "Private"}
              </div>
            </form>

            {currentLieMedia.published ? (
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
              onClick={this.deleteLieMedia}>
              
              Delete
            </button>
            
            <button
              type="submit"
              className="submit-button"
              onClick={this.updateLieMedia}>
            
              Update
            </button>
            <p><button
                className="submit-button">
                <Link to={"/liesmedia"}>
                List of Media Lies </Link>
              </button></p>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Media Lie...</p>
          </div>
        )}
      </div>
    );
  }
}