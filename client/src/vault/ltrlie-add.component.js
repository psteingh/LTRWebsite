import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import LtrLieDataService from "../services/ltrlie.service";
import AuthService from "../services/auth.service";

const name = value => {
  if (!value) {
    return (
      <div className="alert alert-notice" role="alert">
        Name is required
      </div>
    );
  }
};

const subject = value => {
  if (!value) {
    return (
      <div className="alert alert-notice" role="alert">
        Subject is required
      </div>
    );
  }
};

const stuff = value => {
  if (!value) {
    return (
      <div className="alert alert-notice" role="alert">
        This field is required
      </div>
    );
  }
};

export default class LtrLieAdd extends Component {
  constructor(props) {
    super(props);
    // this.handleCreate = this.handleCreate.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeSubject = this.onChangeSubject.bind(this);
    this.onChangeStuff = this.onChangeStuff.bind(this);
    this.saveLtrLie = this.saveLtrLie.bind(this);
    this.newLtrLie = this.newLtrLie.bind(this);
    
    this.state = {
      id: null,
      name: "",
      subject: "",
      stuff: "",
      currentUser: AuthService.getCurrentUser(),
      loading: false,
      message: "",
      published: false,
      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeSubject(e) {
    this.setState({
      subject: e.target.value
    });
  }

  onChangeStuff(e) {
    this.setState({
      stuff: e.target.value
    });
  }

// handleCreate(e) {
//   e.preventDefault();
  
//   this.setState({
//     message: "",
//     loading: true
//   });

  // this.form.validateAll();
  
  saveLtrLie() {
    var data = {
      name: this.state.name,
      subject: this.state.subject,
      stuff: this.state.stuff,
      currentUser: this.state.currentUser.id,
    };

    // if (this.checkBtn.context._errors.length === 0) {  
    
      LtrLieDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          subject: response.data.subject,
          stuff: response.data.stuff,
          published: response.data.published,
          submitted: true
        });
        console.log(response.data);
        // this.props.history.push("/ltrlies");
      },
      // error => {
      //   const resMessage =
      //     (error.response &&
      //       error.response.data &&
      //       error.response.data.message) ||
      //     error.message ||
      //     error.toString();

      //   this.setState({
      //     loading: false,
      //     message: resMessage
      //   });
      // }

      );
  // } else {
  //   this.setState({
  //     loading: false
  //   });
  // }
}

  newLtrLie() {
    this.setState({
      id: null,
      name: "",
      subject: "",
      stuff: "",
      published: false,
      submitted: false
    });
  }

  render() {
    
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Submitted successfully</h4>
            <p><button
                className="submit-button"
                onClick={this.newLtrLie}>
                Add another Lie
              </button></p>
              <p><button
                className="submit-button">
                <Link to={"/ltrlies"}>
                List of Lies </Link>
              </button></p> 
           </div>
        ) : (
          <div>
          <Form onSubmit={this.handleCreate}
            ref={c => {this.form = c;}}>

            <div className="form-group">
              <label htmlFor="name"><h4>Name</h4></label>
              <Input
                type="text"
                className="form-control"
                id="name"
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
                validations={[name]}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="subject"><h4>Subject</h4></label>
              <Input
                type="text"
                className="form-control"
                name="subject"
                id="subject"
                value={this.state.subject}
                onChange={this.onChangeSubject}
                validations={[subject]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="stuff"><h4>Stuff</h4></label>
              <Input
                type="text"
                className="form-control"
                id="stuff"
                value={this.state.stuff}
                onChange={this.onChangeStuff}
                name="stuff"
                validations={[stuff]}
              />
            </div>

            <p><button
                className="submit-button"
                onClick={this.saveLtrLie}>
                Add Lie </button></p>

              <p><button
                className="submit-button">
                <Link to={"/ltrlies"}>
                List of Lies </Link>
              </button></p>
         
              <CheckButton style={{ display: "none" }}
              ref={c => {this.checkBtn = c;}} />
         
          </Form>
         </div>
        )}
      </div>
    );
  }
}