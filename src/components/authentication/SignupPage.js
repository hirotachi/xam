import React, { Component } from "react";
import { connect } from "react-redux";
import { resetRef } from "../../actions/support";
import {
  approveEmail,
  approveUserName,
  requestEmailCheck,
  requestSignup,
  requestUserNameCheck
} from "../../actions/auth";


class SignupPage extends Component {
  state = {
    userName: "",
    email: "",
    password: "",
    passTwo: "",
    terms: false,
    success: false
  };

  // componentWillMount(){
  //   const logo = document.getElementsByTagName("h1")[0];
  //   logo.style.backgroundColor = "red";
  // };


  componentDidMount() {
    this.props.dispatch(resetRef());
  }
  //================================================
  handleUserNameChange = (e) => {
    const userName = e.target.value;
    this.setState(() => ({userName}));
    this.props.dispatch(approveUserName())
  };
  handleEmailChange = (e) => {
    const email = e.target.value;
    this.setState(() => ({email}));
    this.props.dispatch(approveEmail())
  };
  handlePasswordChange = (e) => {
    const password = e.target.value;
    this.setState(() => ({password}));
  };
  handlePassTwoChange = (e) => {
    const passTwo = e.target.value;
    this.setState(() => ({passTwo}));
  };
  handleTermsChange = () => {
    this.setState(() => ({terms: !this.state.terms}))
  };
  //================================================
  handleFormSubmit = (e) => {
    e.preventDefault();
    const {userName, email, password, passTwo, terms} = this.state;
    const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.submitCheck({userName, email, password, passTwo}, emailReg);
    if(!!userName && (!!email && emailReg.test(email)) && !!password && !!passTwo && (password === passTwo) && terms){
      this.props.dispatch(requestSignup({userName, email, password}));
      if(!this.props.emailUsed && !this.props.userNameUsed){
        this.setState(() => ({userName: "", email: "", password: "", passTwo: "", terms: false}))
      }
    }
  };
  handleCheckSecondPass = () => {
    const passTwo = document.getElementsByClassName("passTwo")[0];
    if(!!this.state.password && !!this.state.passTwo && this.state.password !== this.state.passTwo){
        passTwo.style.borderColor = "red";
    }else {
      passTwo.style.borderColor = "";
    }
  };
  //=================================================
  // check username and email if they exist
  handleUserNameCheck = () => {
    this.props.dispatch(requestUserNameCheck(this.state.userName))
  };
  handleEmailCheck = () => {
    this.props.dispatch(requestEmailCheck(this.state.email))
  };
  //=================================================
  submitCheck = (object, reg) => { // pass every object as a string and value to single checker
    Object.entries(object).forEach(([ key, value ]) => this.singleFieldCheck(value, key, reg))
  };
  singleFieldCheck = (field, name, reg) => { // check each field and give style according to condition
    if ( (name === "email" && !reg.test(field)) ) {
      document.getElementsByClassName(name)[ 0 ].style.borderColor = "red";
    }else if(name === "passTwo" && !!this.state.password && this.state.password !== field){
      document.getElementsByClassName(name)[ 0 ].style.borderColor = "red";
    } else if ( !field ) {
      document.getElementsByClassName(name)[ 0 ].style.borderColor = "red";
    } else {
      document.getElementsByClassName(name)[ 0 ].style.borderColor = "green";
    }
  };
  //=================================================
  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <div>
            {this.props.userNameUsed && <p>This username is already used</p>}
            <input
              onChange={this.handleUserNameChange}
              value={this.state.userName}
              type="text"
              placeholder="Username"
              className="userName"
              onBlur={this.handleUserNameCheck}
            />
          </div>
          <div>
            {this.props.emailUsed && <p>this email is already used</p>}
            <input
              onChange={this.handleEmailChange}
              value={this.state.email}
              type="text"
              placeholder="Email"
              className="email"
              onBlur={this.handleEmailCheck}
            />
          </div>
          <input
            onChange={this.handlePasswordChange}
            value={this.state.password}
            type="password"
            placeholder="Password"
          className="password"/>
          <input
            onChange={this.handlePassTwoChange}
            value={this.state.passTwo}
            type="password"
            placeholder="Repeat password"
            onBlur={this.handleCheckSecondPass}
            className="pass_confirm passTwo"
          />
          <label htmlFor="terms">
            <input checked={this.state.terms} onChange={this.handleTermsChange} type="checkbox" id="terms"/>
            Agree to terms of service
          </label>
          <button>Sign Up</button>
        </form>
        <div>
          <p>ALready have an account ?
          <button onClick={this.props.requestLogin}>Login</button>
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
   userNameUsed: state.auth.userNameUsed,
   emailUsed: state.auth.emailUsed
  }
};
export default connect(mapStateToProps)(SignupPage);