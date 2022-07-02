import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import LieBibleDataService from "../services/liebible.service";
import AuthService from "../services/auth.service";

const title = value => {
  if (!value) {
    return (
      <div className="alert alert-notice" role="alert">
        Title is required
      </div>
    );
  }
};

const middle = value => {
  if (!value) {
    return (
      <div className="alert alert-notice" role="alert">
        Middle section is required
      </div>
    );
  }
};

const bottom = value => {
  if (!value) {
    return (
      <div className="alert alert-notice" role="alert">
        Bottom section is required
      </div>
    );
  }
};

export default class LieBibleAdd extends Component {
  constructor(props) {
    super(props);
    this.handleCreate = this.handleCreate.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeMiddle = this.onChangeMiddle.bind(this);
    this.onChangeBottom = this.onChangeBottom.bind(this);
    this.newLieBible = this.newLieBible.bind(this);
    
    this.state = {
      id: null,
      title: "",
      middle: "",
      bottom: "",
      currentUser: AuthService.getCurrentUser(),
      published: false,
      submitted: false,
      loading: false,
      message: "",
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeMiddle(e) {
    this.setState({
      middle: e.target.value
    });
  }

  onChangeBottom(e) {
    this.setState({
      bottom: e.target.value
    });
  }

handleCreate(e) {
  e.preventDefault();
  
  this.setState({
    message: "",
    loading: true
  });

  this.form.validateAll();
  
  // saveLieBible() {
    var data = {
      title: this.state.title,
      middle: this.state.middle,
      bottom: this.state.bottom,
      currentUser: this.state.currentUser.id,
    };

    if (this.checkBtn.context._errors.length === 0) {  
    
      LieBibleDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          middle: response.data.middle,
          bottom: response.data.bottom,
          published: response.data.published,
          submitted: true
        });
        console.log(response.data);
        this.props.history.push("/liesbible");
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          loading: false,
          message: resMessage
        });
      }
      );
  } else {
    this.setState({
      loading: false
    });
  }
}

  newLieBible() {
    this.setState({
      id: null,
      title: "",
      middle: "",
      bottom: "",
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
                onClick={this.newLieBible}>
                Add another Bible Lie
              </button></p>
              <p><button
                className="submit-button">
                <Link to={"/liesbible"}>
                List of Bible Lies </Link>
              </button></p> 
           </div>
        ) : (
          <div>
          <Form onSubmit={this.handleCreate}
            ref={c => {this.form = c;}}>

            <div className="form-group">
              <label htmlFor="title"><h4>Title</h4></label>
              <Input
                type="text"
                className="form-control"
                id="title"
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
                validations={[title]}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="middle"><h4>Middle</h4></label>
              <Input
                type="text"
                className="form-control"
                name="middle"
                id="middle"
                value={this.state.middle}
                onChange={this.onChangeMiddle}
                validations={[middle]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="bottom"><h4>Bottom</h4></label>
              <Input
                type="text"
                className="form-control"
                id="bottom"
                value={this.state.bottom}
                onChange={this.onChangeBottom}
                name="bottom"
                validations={[bottom]}
              />
            </div>

            <p><button
                className="submit-button"
                onClick={this.saveLieBible}>
                Add Bible Lie </button></p>

              <p><button
                className="submit-button">
                <Link to={"/liesbible"}>
                List of Bible Lies </Link>
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