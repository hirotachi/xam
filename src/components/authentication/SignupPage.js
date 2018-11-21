import React, { Component } from "react";
import { connect } from "react-redux";
import { resetRef } from "../../actions/support";


class SignupPage extends Component {
  state = {
    userName: "",
    email: "",
    passOne: "",
    passTwo: "",
    terms: false,
    success: false
  };

  componentWillMount(){
    const logo = document.getElementsByTagName("h1")[0];
    logo.style.backgroundColor = "red";
  };

  componentDidUpdate(){
    if(this.state.success){
      this.props.signUp();
    }
  };

  componentDidMount() {
    this.props.dispatch(resetRef());
  }
  //================================================
  handleUserNameChange = (e) => {
    const userName = e.target.value;
    this.setState(() => ({userName}));
  };
  handleEmailChange = (e) => {
    const email = e.target.value;
    this.setState(() => ({email}));
  };
  handlePassOneChange = (e) => {
    const passOne = e.target.value;
    this.setState(() => ({passOne}));
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
    const {userName, email, passOne, passTwo, terms} = this.state;
    const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.submitCheck({userName, email, passOne, passTwo}, emailReg);
    if(!!userName && (!!email && emailReg.test(email)) && !!passOne && !!passTwo && (passOne === passTwo)){
      this.handleSignUp({userName, email, passOne, passTwo});
      this.setState(() => ({userName: "", email: "", passOne: "", passTwo: "", terms: false}))
    }
  };
  handleSignUp = (data) => {
      console.log(data)
    this.setState(() => ({success: true}))
  };
  handleCheckSecondPass = () => {
    const passTwo = document.getElementsByClassName("passTwo")[0];
    if(!!this.state.passOne && !!this.state.passTwo && this.state.passOne !== this.state.passTwo){
        passTwo.style.borderColor = "red";
    }else {
      passTwo.style.borderColor = "";
    }
  };
  //=================================================
  submitCheck = (object, reg) => { // pass every object as a string and value to single checker
    Object.entries(object).forEach(([ key, value ]) => this.singleFieldCheck(value, key, reg))
  };
  singleFieldCheck = (field, name, reg) => { // check each field and give style according to condition
    if ( (name === "email" && !reg.test(field)) ) {
      document.getElementsByClassName(name)[ 0 ].style.borderColor = "red";
    }else if(name === "passTwo" && !!this.state.passOne && this.state.passOne !== field){
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
          <input
            onChange={this.handleUserNameChange}
            value={this.state.userName}
            type="text"
            placeholder="Username"
          className="userName"/>
          <input
            onChange={this.handleEmailChange}
            value={this.state.email}
            type="text"
            placeholder="Email"
          className="email"/>
          <input
            onChange={this.handlePassOneChange}
            value={this.state.passOne}
            type="password"
            placeholder="Password"
          className="passOne"/>
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
      </div>
    );
  }
}
export default connect()(SignupPage);