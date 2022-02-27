import React from "react";
import axios from "axios";

import UserService from "../services/user.service";

export default class Contact extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          name: '',
          email: '',
          subject:'',
          message: '',
          successful: false,
          messStatus: "",
        }
    }

    componentDidMount() {
        UserService.getPublicContent().then(
          response => {
            this.setState({
              content: response.data
            });
          },
          error => {
            this.setState({
              content:
                (error.response && error.response.data) ||
                error.message ||
                error.toString()
            });
          }
        );
    }

    onNameChange(event) {
        this.setState({name: event.target.value})
    }

    onEmailChange(event) {
        this.setState({email: event.target.value})
    }

    onSubjectChange(event) {
        this.setState({subject: event.target.value})
    }

    onMsgChange(event) {
        this.setState({message: event.target.value})
    }

    submitEmail(e){
        e.preventDefault();
        axios({
        method: "POST", 
        url:"/send", 
        data:  this.state
        }).then((response)=>{
          if (response.data.messStatus === 'Message sent'){
            this.setState({
                messStatus: response.data.messStatus,
                successful: true,
            });
            this.resetForm()
          }else if(response.data.messStatus === 'fail'){
            this.setState({
                successful: false,
                messStatus: response.data.messStatus,
            });
           }
        })
}

resetForm(){
        this.setState({name: '', email: '',subject:'', message: ''})
}

render() {
    return (
    <div className="section">
    <div className="container">
    <div className="row">
    <div className="col-md-12">
        <div className="section-title">
            <h2 className="title">Contact Us</h2>
            <p>Questions, comments, please let us know</p>
    <form id="contact-form" onSubmit={this.submitEmail.bind(this)} 
                method="POST">
        <div className="form-group">
        <div className="row">
        <div className="col-md-6">
            <input placeholder = "Name"  id="name" type="text" 
            className="form-control" required value={this.state.name} 
            onChange={this.onNameChange.bind(this)}/>
        </div>
        <div className="col-md-6">
            <input placeholder = "Email"  id="email" type="email"
            className="form-control" aria-describedby="emailHelp"
            required value={this.state.email} onChange=
            {this.onEmailChange.bind(this)}/>
        </div>
        </div>
        </div>
        <div className="form-group">
            <input placeholder = "Subject"  id="subject" type="text"
            className="form-control" required value={this.state.subject}
            onChange={this.onSubjectChange.bind(this)}/>
        </div>
        <div className="form-group">
            <textarea placeholder = "Message"  id="message" 
            className="form-control" rows="3" 
            required value={this.state.message}
            onChange= {this.onMsgChange.bind(this)}/>
        </div>

        <button type="submit" className="submit-button">
        Send message</button>

        {this.state.messStatus && (
          <div className="row">
              <div className="col-md-6">
              <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert">
                  {this.state.messStatus}
              
              </div>
              </div>
              </div>
        )}
      </form>
      </div>
    </div>
    </div>
    </div>
    </div>
    );
}
}