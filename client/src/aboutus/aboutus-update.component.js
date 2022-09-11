import React, { Component } from "react";
import { Link } from "react-router-dom";
import AboutUsDataService from "../services/aboutus.service";

export default class AboutUsUpdate extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeMiddle = this.onChangeMiddle.bind(this);
    this.onChangeBottom = this.onChangeBottom.bind(this);
    this.getAboutUs = this.getAboutUs.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateAboutUs = this.updateAboutUs.bind(this);
    this.deleteAboutUs = this.deleteAboutUs.bind(this);

    this.state = {
      currentAboutUs: {
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
    this.getAboutUs(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentAboutUs: {
          ...prevState.currentAboutUs,
          title: title
        }
      };
    });
  }

  onChangeMiddle(e) {
    const middle = e.target.value;
    
    this.setState(prevState => ({
      currentAboutUs: {
        ...prevState.currentAboutUs,
        middle: middle
      }
    }));
  }

  onChangeBottom(e) {
    const bottom = e.target.value;
    
    this.setState(prevState => ({
      currentAboutUs: {
        ...prevState.currentAboutUs,
        bottom: bottom
      }
    }));
  }

  getAboutUs(id) {
    AboutUsDataService.get(id)
      .then(response => {
        this.setState({
          currentAboutUs: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
 
  updatePublished(status) {
    var data = {
      id: this.state.currentAboutUs.id,
      title: this.state.currentAboutUs.title,
      middle: this.state.currentAboutUs.middle,
      bottom: this.state.currentAboutUs.bottom,
      published: status
    };
    
    AboutUsDataService.update(this.state.currentAboutUs.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentAboutUs: {
            ...prevState.currentAboutUs,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateAboutUs() {
    AboutUsDataService.update(
      this.state.currentAboutUs.id,
      this.state.currentAboutUs
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The About Us was updated successfully"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteAboutUs() {    
    AboutUsDataService.delete(this.state.currentAboutUs.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/aboutus')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentAboutUs } = this.state;

    return (
      <div>        
        {currentAboutUs ? (
          <div className="edit-form">
            <h5>About Us details</h5>
            <form>
              <div className="form-group">
                <label htmlFor="title"><h4>Title</h4></label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentAboutUs.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="middle"><h4>Middle</h4></label>
                <input
                  type="text"
                  className="form-control"
                  id="middle"
                  value={currentAboutUs.middle}
                  onChange={this.onChangeMiddle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="bottom"><h4>Bottom</h4></label>
                <input
                  type="text"
                  className="form-control"
                  id="bottom"
                  value={currentAboutUs.bottom}
                  onChange={this.onChangeBottom}
                />
              </div>
              <div className="form-group">
                <label><h4>Status:</h4></label>
                {currentAboutUs.published ? "Public" : "Private"}
              </div>
            </form>

            {currentAboutUs.published ? (
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
              onClick={this.deleteAboutUs}>
              
              Delete
            </button>
            
            <button
              type="submit"
              className="submit-button"
              onClick={this.updateAboutUs}>
            
              Update
            </button>
            <p><button
                className="submit-button">
                <Link to={"/aboutus"}>
                List of About Us </Link>
              </button></p>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on an About Us...</p>
          </div>
        )}
      </div>
    );
  }
}