import React, { Component } from "react";
import { Link } from "react-router-dom";
import MusingsDataService from "../services/musings.service";

export default class MusingsUpdate extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeMiddle = this.onChangeMiddle.bind(this);
    this.onChangeBottom = this.onChangeBottom.bind(this);
    this.getMusings = this.getMusings.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateMusings = this.updateMusings.bind(this);
    this.deleteMusings = this.deleteMusings.bind(this);

    this.state = {
      currentMusings: {
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
    this.getMusings(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentMusings: {
          ...prevState.currentMusings,
          title: title
        }
      };
    });
  }

  onChangeMiddle(e) {
    const middle = e.target.value;
    
    this.setState(prevState => ({
      currentMusings: {
        ...prevState.currentMusings,
        middle: middle
      }
    }));
  }

  onChangeBottom(e) {
    const bottom = e.target.value;
    
    this.setState(prevState => ({
      currentMusings: {
        ...prevState.currentMusings,
        bottom: bottom
      }
    }));
  }

  getMusings(id) {
    MusingsDataService.get(id)
      .then(response => {
        this.setState({
          currentMusings: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
 
  updatePublished(status) {
    var data = {
      id: this.state.currentMusings.id,
      title: this.state.currentMusings.title,
      middle: this.state.currentMusings.middle,
      bottom: this.state.currentMusings.bottom,
      published: status
    };
    
    MusingsDataService.update(this.state.currentMusings.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentMusings: {
            ...prevState.currentMusings,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateMusings() {
    MusingsDataService.update(
      this.state.currentMusings.id,
      this.state.currentMusings
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Musings was updated successfully"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteMusings() {    
    MusingsDataService.delete(this.state.currentMusings.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/musings')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentMusings } = this.state;

    return (
      <div>        
        {currentMusings ? (
          <div className="edit-form">
            <h5>Musings details</h5>
            <form>
              <div className="form-group">
                <label htmlFor="title"><h4>Title</h4></label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentMusings.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="middle"><h4>Middle</h4></label>
                <input
                  type="text"
                  className="form-control"
                  id="middle"
                  value={currentMusings.middle}
                  onChange={this.onChangeMiddle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="bottom"><h4>Bottom</h4></label>
                <input
                  type="text"
                  className="form-control"
                  id="bottom"
                  value={currentMusings.bottom}
                  onChange={this.onChangeBottom}
                />
              </div>
              <div className="form-group">
                <label><h4>Status:</h4></label>
                {currentMusings.published ? "Public" : "Private"}
              </div>
            </form>

            {currentMusings.published ? (
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
              onClick={this.deleteMusings}>
              
              Delete
            </button>
            
            <button
              type="submit"
              className="submit-button"
              onClick={this.updateMusings}>
            
              Update
            </button>
            <p><button
                className="submit-button">
                <Link to={"/musings"}>
                List of Musings </Link>
              </button></p>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Musings...</p>
          </div>
        )}
      </div>
    );
  }
}