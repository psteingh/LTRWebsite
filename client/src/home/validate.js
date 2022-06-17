import React from "react";
import "./styles.css";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      verifyEmail: "",
      errors: {
        email: "",
        verifyEmail: ""
      }
    };
  }

  isEmailValid = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  validateEmail = email => {
    const errors = {
      email: ""
    };

    if (!this.isEmailValid(email)) {
      errors.email = "Email is invalid";
    }

    this.setState(state => ({ ...state, errors }));
  };

  validateEmailVerification = verifiedEmail => {
    const errors = {
      verifyEmail: ""
    };

    if (verifiedEmail !== this.state.email) {
      errors.verifyEmail = "Emails are not equal";
    }

    this.setState(state => ({ ...state, errors }));
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });

    switch (name) {
      case "email":
        this.validateEmail(value);
        break;
      case "verifyEmail":
        this.validateEmailVerification(value);
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <div>
        <p>
          Email Address:
          <input
            name="email"
            type="text"
            value={this.state.email}
            onChange={this.handleChange}
          />
          {this.state.errors.email && <span>{this.state.errors.email}</span>}
        </p>
        <p>
          Verify Email Address:
          <input
            type="text"
            name="verifyEmail"
            value={this.state.verifyEmail}
            onChange={this.handleChange}
          />
          {this.state.errors.verifyEmail && (
            <span>{this.state.errors.verifyEmail}</span>
          )}
        </p>
        <p>
          <button>Submit</button>
        </p>
      </div>
    );
  }
}
