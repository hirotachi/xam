import React, { Component } from "react";
import { connect } from "react-redux";
import { enterSupport, leaveSupport, setRef } from "../../actions/support";
import {login} from "../../actions/auth";


class SupportPage extends Component {
  state = {
    mainSubject: "",
    fullName: "",
    email: "",
    subject: "",
    message: "",
    success: false
  };

  componentDidMount() {
      if(localStorage.xamUser){
        const { token } = JSON.parse(localStorage.xamUser);
        this.props.dispatch(login(token))
      }
    this.props.dispatch(enterSupport());
  }

  componentDidUpdate() {
    if ( this.state.success ) {
      const success = setTimeout(() => {
        this.setState(() => ({ success: false }));
        clearTimeout(success);
      }, 1000)
    }
  }

  componentWillUnmount() {
    this.props.dispatch(leaveSupport());
  }

  //====================================================
  handleMainSubjectChange = (e) => {
    const mainSubject = e.target.value;
    this.setState(() => ({ mainSubject }))
  };
  handleFullNameChange = (e) => {
    const fullName = e.target.value;
    this.setState(() => ({ fullName }))
  };
  handleEmailChange = (e) => {
    const email = e.target.value;
    this.setState(() => ({ email }))
  };
  handleSubjectChange = (e) => {
    const subject = e.target.value;
    this.setState(() => ({ subject }))
  };
  handleMessageChange = (e) => {
    const message = e.target.value;
    this.setState(() => ({ message }))
  };
  //====================================================
  handleFormSubmit = (e) => {
    const { fullName, email, subject, message } = this.state;
    const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    e.preventDefault();
    if ( !!fullName && emailReg.test(email) && !!subject && !!message ) {
      this.setState(() => ({
        mainSubject: "", fullName: "", email: "", subject: "", message: "", success: true
      }));
    }
    this.submitCheck({ fullName, email, subject, message }, emailReg)
  };
  //====================================================
  submitCheck = (object, reg) => { // pass every object as a string and value to single checker
    // console.log(mainSubject, fullName, email, subject, message)
    Object.entries(object).forEach(([ key, value ]) => this.singleFieldCheck(value, key, reg))

  };
  singleFieldCheck = (field, name, reg) => { // check each field and give style according to condition
    if ( (name === "email" && !reg.test(field)) ) {
      document.getElementsByClassName(name)[ 0 ].style.borderColor = "red";
    } else if ( !field ) {
      document.getElementsByClassName(name)[ 0 ].style.borderColor = "red";
    } else {
      document.getElementsByClassName(name)[ 0 ].style.borderColor = "green";
    }
  };

  //====================================================


  render() {
    return (
      <div>
        <h2>How can we help?</h2>
        {this.state.success ? <p>success</p> :
          <React.Fragment>
            <select
              name="headerSubject"
              defaultValue="What would you like to talk about?"
              onChange={this.handleMainSubjectChange}
            >
              <option disabled>What would you like to talk about?</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            <form onSubmit={this.handleFormSubmit}>
              <input
                value={this.state.fullName}
                onChange={this.handleFullNameChange}
                type="text"
                placeholder="Full name"
                className="fullName"
              />
              <input
                value={this.state.email}
                onChange={this.handleEmailChange}
                type="text"
                placeholder="Email"
                className="email"
              />
              <input
                value={this.state.subject}
                onChange={this.handleSubjectChange}
                type="text"
                placeholder="Subject"
                className="subject"
              />
              <textarea
                value={this.state.message}
                onChange={this.handleMessageChange}
                placeholder="Let us know how can we help"
                className="message"
              />
              <button>Submit</button>
            </form>
          </React.Fragment>
        }

      </div>
    );
  }
}

const mapStatToProps = (state) => {
  return {
    auth: state.auth.auth
  }
};
export default connect(mapStatToProps)(SupportPage);