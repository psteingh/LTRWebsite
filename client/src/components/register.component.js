import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

import FooterSmall from "../home/footersmall";

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-notice" role="alert">
        Email is required
      </div>
    );
  }
};

// const username = value => {
//   if (value.length < 3 || value.length > 20) {
//     return (
//       <div className="alert alert-notice" role="alert">
//         User Name must be between 3 and 20 characters
//       </div>
//     );
//   }
// };

const password = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-notice" role="alert">
        Password must be between 6 and 40 characters
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    // this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      // username: "",
      email: "",
      password: "",
      successful: false,
      message: ""
    };
  }

  // onChangeUsername(e) {
  //   this.setState({
  //     username: e.target.value
  //   });
  // }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        // this.state.username,
        this.state.email,
        this.state.password
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                {/* <div className="form-group">
                  <Input
                    placeholder="User Name"
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[username]}
                  />
                </div> */}
                <div className="form-group">
                  <Input
                    placeholder="Email"
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[email]}
                  />
                </div>

                <div className="form-group">
                  <Input
                    placeholder="Password"
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[password]}
                  />
                </div>

                <div className="form-group">
                  <button className="submit-button">Sign Up</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>

          <div>
          <h4>Already signed up?
          <button className="action-button">
          <Link to={"/login"}>
            Log In
          </Link>
          </button>
          </h4>
        </div>

        </div>

        <FooterSmall />

      </div>
    );
  }
}