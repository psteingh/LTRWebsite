import React, { Component } from "react";
import { Link } from "react-router-dom";
import LieGeneralDataService from "../services/liegeneral.service";

export default class LieGeneralUpdate extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeMiddle = this.onChangeMiddle.bind(this);
    this.onChangeBottom = this.onChangeBottom.bind(this);
    this.getLieGeneral = this.getLieGeneral.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateLieGeneral = this.updateLieGeneral.bind(this);
    this.deleteLieGeneral = this.deleteLieGeneral.bind(this);

    this.state = {
      currentLieGeneral: {
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
    this.getLieGeneral(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentLieGeneral: {
          ...prevState.currentLieGeneral,
          title: title
        }
      };
    });
  }

  onChangeMiddle(e) {
    const middle = e.target.value;
    
    this.setState(prevState => ({
      currentLieGeneral: {
        ...prevState.currentLieGeneral,
        middle: middle
      }
    }));
  }

  onChangeBottom(e) {
    const bottom = e.target.value;
    
    this.setState(prevState => ({
      currentLieGeneral: {
        ...prevState.currentLieGeneral,
        bottom: bottom
      }
    }));
  }

  getLieGeneral(id) {
    LieGeneralDataService.get(id)
      .then(response => {
        this.setState({
          currentLieGeneral: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
 
  updatePublished(status) {
    var data = {
      id: this.state.currentLieGeneral.id,
      title: this.state.currentLieGeneral.title,
      middle: this.state.currentLieGeneral.middle,
      bottom: this.state.currentLieGeneral.bottom,
      published: status
    };
    
    LieGeneralDataService.update(this.state.currentLieGeneral.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentLieGeneral: {
            ...prevState.currentLieGeneral,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateLieGeneral() {
    LieGeneralDataService.update(
      this.state.currentLieGeneral.id,
      this.state.currentLieGeneral
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The General Lie was updated successfully"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteLieGeneral() {    
    LieGeneralDataService.delete(this.state.currentLieGeneral.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/liesgeneral')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentLieGeneral } = this.state;

    return (
      <div>        
        {currentLieGeneral ? (
          <div className="edit-form">
            <h5>General Lie details</h5>
            <form>
              <div className="form-group">
                <label htmlFor="title"><h4>Title</h4></label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentLieGeneral.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="middle"><h4>Middle</h4></label>
                <input
                  type="text"
                  className="form-control"
                  id="middle"
                  value={currentLieGeneral.middle}
                  onChange={this.onChangeMiddle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="bottom"><h4>Bottom</h4></label>
                <input
                  type="text"
                  className="form-control"
                  id="bottom"
                  value={currentLieGeneral.bottom}
                  onChange={this.onChangeBottom}
                />
              </div>
              <div className="form-group">
                <label><h4>Status:</h4></label>
                {currentLieGeneral.published ? "Public" : "Private"}
              </div>
            </form>

            {currentLieGeneral.published ? (
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
              onClick={this.deleteLieGeneral}>
              
              Delete
            </button>
            
            <button
              type="submit"
              className="submit-button"
              onClick={this.updateLieGeneral}>
            
              Update
            </button>
            <p><button
                className="submit-button">
                <Link to={"/liesgeneral"}>
                List of General Lies </Link>
              </button></p>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a General Lie...</p>
          </div>
        )}
      </div>
    );
  }
}