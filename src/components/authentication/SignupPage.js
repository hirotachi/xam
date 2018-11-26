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
    success: false,
    fieldsEmpty: false,
    passMatch : true
  };


  componentDidMount() {
    this.props.dispatch(resetRef());
  };
  componentDidUpdate(){
    this.addErrortoUsedFields("userName", this.props.userNameUsed);
    this.addErrortoUsedFields("email", this.props.emailUsed);
  };
  addErrortoUsedFields = (fieldName, reduxProps) => { // check if info is used and style accordingly
    const field = document.getElementsByClassName(fieldName)[0];
    if(reduxProps){
      field.classList.add("err-field");
    }else if(!reduxProps && !field.value) {
      field.classList.add("err-field");
    }else {
      field.classList.remove("err-field");
    }
  };
  //================================================
  handleUserNameChange = (e) => {
    this.handleResetFieldsError();
    const userName = e.target.value;
    this.setState(() => ({userName}));
    this.props.dispatch(approveUserName())
  };
  handleEmailChange = (e) => {
    this.handleResetFieldsError();
    const email = e.target.value;
    this.setState(() => ({email}));
    this.props.dispatch(approveEmail())
  };
  handlePasswordChange = (e) => {
    this.handleResetFieldsError();
    const password = e.target.value;
    this.setState(() => ({password}));
  };
  handlePassTwoChange = (e) => {
    this.handleResetFieldsError();
    const passTwo = e.target.value;
    this.setState(() => ({passTwo}));
  };
  handleTermsChange = () => {
    this.handleResetFieldsError();
    this.setState(() => ({terms: !this.state.terms}))
  };
  handleResetFieldsError = () => {
    if(this.state.fieldsEmpty){
      this.setState(() => ({fieldsEmpty: false}))
    }
  };
  //================================================
  handleFormSubmit = (e) => {
    e.preventDefault();
    const {userName, email, password, passTwo, terms} = this.state;
    const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.submitCheck({userName, email, password, passTwo}, emailReg);
    if(!!userName && (!!email && emailReg.test(email)) && !!password && !!passTwo && (password === passTwo) && terms){
      this.props.dispatch(requestSignup({userName, email, password}));
      this.setState(() => ({fieldsEmpty: false}));
      if(!this.props.emailUsed && !this.props.userNameUsed){
        this.setState(() => (
          {userName: "", email: "",
          password: "", passTwo: "",
          terms: false, fieldsEmpty: false}
          ))
      }
    }else {
      this.setState(() => ({fieldsEmpty: true}));
    }
  };
  handleCheckSecondPass = () => { // checks form passwords match
    this.handleFieldsBlur();
    const passTwo = document.getElementsByClassName("passTwo")[0];
    if(!!this.state.password && !!this.state.passTwo && this.state.password !== this.state.passTwo){
      this.setState(() => ({passMatch: false}));
        passTwo.classList.add("err-field");
    }else {
      this.setState(() => ({passMatch: true}));
      passTwo.classList.remove("err-field");
    }
  };
  //=================================================
  // check username and email if they exist
  handleUserNameCheck = () => {
    this.handleFieldsBlur();
    this.props.dispatch(requestUserNameCheck(this.state.userName.toLowerCase()))
  };
  handleEmailCheck = () => {
    this.handleFieldsBlur();
    this.props.dispatch(requestEmailCheck(this.state.email))
  };
  //=================================================
  submitCheck = (object, reg) => { // pass every object as a string and value to single checker
    Object.entries(object).forEach(([ key, value ]) => this.singleFieldCheck(value, key, reg))
  };
  singleFieldCheck = (field, name, reg) => { // check each field and give style according to condition
    if ( (name === "email" && !reg.test(field)) ) {
      document.getElementsByClassName(name)[ 0 ].classList.add("err-field");
    }else if(name === "passTwo" && !!this.state.password && this.state.password !== field){
      document.getElementsByClassName(name)[ 0 ].classList.add("err-field");
    } else if ( !field ) {
      document.getElementsByClassName(name)[ 0 ].classList.add("err-field");
    } else {
      document.getElementsByClassName(name)[ 0 ].classList.remove("err-field");
    }
  };
  //=================================================
  handleFieldsFocus = () => { // scale the logo down for ease form filling
    if(screen.width <= 480){
      const logo = document.getElementsByClassName("home__logo")[0];
      logo.style.fontSize = "0";
    }
  };
  handleFieldsBlur = () => {
    if(screen.width <= 480){
      const logo = document.getElementsByClassName("home__logo")[0];
      logo.style.fontSize = "10vh";
    }
  };

  //=================================================
  render() {
    return (
      <div className="signUp">
        <form className="signUp__form" onSubmit={this.handleFormSubmit}>
          {this.state.fieldsEmpty && <p className="err-msg">All fields must be filled</p>}
          <div className="signUp__form--container">
            {this.props.userNameUsed && <p className="err-msg">Username not available</p>}
            <input
              onChange={this.handleUserNameChange}
              value={this.state.userName}
              type="text"
              placeholder="Username"
              className="userName signUp__form--field"
              onBlur={this.handleUserNameCheck}
              onFocus={this.handleFieldsFocus}
            />
          </div>
          <div className="signUp__form--container">
            {this.props.emailUsed && <p className="err-msg">this email is already used</p>}
            <input
              onChange={this.handleEmailChange}
              value={this.state.email}
              type="text"
              placeholder="Email"
              className="email signUp__form--field"
              onBlur={this.handleEmailCheck}
              onFocus={this.handleFieldsFocus}
            />
          </div>
          <div className="signUp__form--container">
            <input
              onChange={this.handlePasswordChange}
              value={this.state.password}
              type="password"
              placeholder="Password"
              className="password signUp__form--field"
              onFocus={this.handleFieldsFocus}
              onBlur={this.handleFieldsBlur}
            />
          </div>
          <div className="signUp__form--container">
            {!this.state.passMatch && <p className="err-msg">Password doesn't match</p>}
            <input
              onChange={this.handlePassTwoChange}
              value={this.state.passTwo}
              type="password"
              placeholder="Repeat password"
              onBlur={this.handleCheckSecondPass}
              className="pass_confirm passTwo signUp__form--field"
              onFocus={this.handleFieldsFocus}
            />
          </div>

          <label className="signUp__form--terms" htmlFor="terms">
            <input checked={this.state.terms} onChange={this.handleTermsChange} type="checkbox" id="terms"/>
            Agree to terms of service
          </label>
          <button className="btn btn-lg btn-primary">Sign Up</button>
        </form>
        <div>
          <div className="signUp__login">Already have an account ?
          <span className="link" onClick={this.props.requestLogin}>Login</span>
          </div>
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