import React, { Component } from "react";
import { Link } from "react-router-dom";
import LtrLieDataService from "../services/ltrlie.service";

export default class LtrLieUpdate extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeSubject = this.onChangeSubject.bind(this);
    this.onChangeStuff = this.onChangeStuff.bind(this);
    this.getLtrLie = this.getLtrLie.bind(this);
    this.updateLtrLie = this.updateLtrLie.bind(this);
    this.deleteLtrLie = this.deleteLtrLie.bind(this);

    this.state = {
      currentLtrLie: {
        id: null,
        name: "",
        subject: "",
        stuff: "",
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getLtrLie(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentLtrLie: {
          ...prevState.currentLtrLie,
          name: name
        }
      };
    });
  }

  onChangeSubject(e) {
    const subject = e.target.value;
    
    this.setState(prevState => ({
      currentLtrLie: {
        ...prevState.currentLtrLie,
        subject: subject
      }
    }));
  }

  onChangeStuff(e) {
    const stuff = e.target.value;
    
    this.setState(prevState => ({
      currentLtrLie: {
        ...prevState.currentLtrLie,
        stuff: stuff
      }
    }));
  }

  getLtrLie(id) {
    LtrLieDataService.get(id)
      .then(response => {
        this.setState({
          currentLtrLie: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateLtrLie() {
    LtrLieDataService.update(
      this.state.currentLtrLie.id,
      this.state.currentLtrLie
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The lie was updated successfully"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteLtrLie() {    
    LtrLieDataService.delete(this.state.currentLtrLie.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/ltrlies')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentLtrLie } = this.state;

    return (
      <div>        
        {currentLtrLie ? (
          <div className="edit-form">
            <h5>Lie details</h5>
            <form>
              <div className="form-group">
                <label htmlFor="name"><h4>Name</h4></label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentLtrLie.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject"><h4>Subject</h4></label>
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  value={currentLtrLie.subject}
                  onChange={this.onChangeSubject}
                />
              </div>
              <div className="form-group">
                <label htmlFor="stuff"><h4>Stuff</h4></label>
                <input
                  type="text"
                  className="form-control"
                  id="stuff"
                  value={currentLtrLie.stuff}
                  onChange={this.onChangeStuff}
                />
              </div>
            </form>

            <button
              className="action-button"
              onClick={this.deleteLtrLie}>
              
              Delete
            </button>
            
            <button
              type="submit"
              className="submit-button"
              onClick={this.updateLtrLie}>
            
              Update
            </button>
            <p><button
                className="submit-button">
                <Link to={"/ltrlies"}>
                List of Lies </Link>
              </button></p>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Lie...</p>
          </div>
        )}
      </div>
    );
  }
}