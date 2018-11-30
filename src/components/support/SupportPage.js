import React, { Component } from "react";
import { connect } from "react-redux";
import {enterSupport, leaveSupport, sendTicket, setRef, ticketReset, ticketSent} from "../../actions/support";
import {login} from "../../actions/auth";
import Controls from "../dashboard/controls/Controls";
import Responsive from "../../Responsive/Responsive";


class SupportPage extends Component {
  state = {
    fullName: "",
    email: "",
    subject: "",
    message: "",
  };

  componentDidMount() {
      if(localStorage.xamUser){
        const { token } = JSON.parse(localStorage.xamUser);
        this.props.dispatch(login(token))
      }
    this.props.dispatch(enterSupport());
  }

  componentDidUpdate() {
    if ( this.props.support.sent ) {
      const success = setTimeout(() => {
        this.props.dispatch(ticketReset());
        clearTimeout(success);
      }, 5000)
    }
  }

  componentWillUnmount() {
    this.props.dispatch(leaveSupport());
  }

  //====================================================
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
         fullName: "", email: "", subject: "", message: "", success: true
      }));
      this.props.dispatch(sendTicket({ fullName, email, subject, message }));
    }
    this.submitCheck({ fullName, email, subject, message }, emailReg)
  };
  //====================================================
  submitCheck = (object, reg) => { // pass every object as a string and value to single checker
    Object.entries(object).forEach(([ key, value ]) => this.singleFieldCheck(value, key, reg))
  };
  singleFieldCheck = (field, name, reg) => { // check each field and give style according to condition
    const tag = document.getElementsByClassName(name)[0];
    if ( (name === "email" && !reg.test(field)) ) {
      tag.classList.add("err-field")
    } else if ( !field ) {
      tag.classList.add("err-field")
    } else {
      tag.classList.remove("err-field")
    }
  };

  //====================================================


  render() {
    return (
      <div>
        <Responsive query={{minWidth: 480}}>
          <Controls
            redirect={this.props.history.push}
            {...this.props}
          />
        </Responsive>

        <h2>How can we help?</h2>
        {this.props.support.sent ? <p>success</p> :
          <React.Fragment>
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
    auth: state.auth.auth,
    support: state.support
  }
};
export default connect(mapStatToProps)(SupportPage);