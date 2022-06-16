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

const password = value => {
  if (!value) {
    return (
      <div className="alert alert-notice" role="alert">
        Password is required
      </div>
    );
  }
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      email: "",
      password: "",
      currentUser: AuthService.getCurrentUser(),
      loading: false,
      message: ""
    };
  }

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

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(
        this.state.email,
        this.state.password,
        this.state.currentUser,
        ).then(
        () => {
          this.props.history.push("/ltrlies");
          window.location.reload();
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

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <Form
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >
          
            <h4>LOG IN</h4>

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
              <button
                className="submit-button submit-signlog-btn"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Log In</span>
              </button>
            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
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
        
        <div className="already-need">
          <h4>Need an account?
          <button className="action-button action-signlog-btn">
          <Link to={"/register"}>
            Sign Up
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