import React, { Component } from "react";
import { connect } from "react-redux";
import { resetRef } from "../../actions/support";


class SignupPage extends Component {
  state = {
    userName: "",
    email: "",
    passOne: "",
    passTwo: "",
    terms: false
  };

  componentWillMount(){
    const logo = document.getElementsByTagName("h1")[0];
    logo.style.backgroundColor = "red";
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
  handleSignUp = (e) => {
    e.preventDefault();
    this.props.signUp();
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSignUp}>
          <input
            onChange={this.handleUserNameChange}
            value={this.state.userName}
            type="text"
            placeholder="Username"/>
          <input
            onChange={this.handleEmailChange}
            value={this.state.email}
            type="text"
            placeholder="Email"/>
          <input
            onChange={this.handlePassOneChange}
            value={this.state.passOne}
            type="password"
            placeholder="Password"/>
          <input
            onChange={this.handlePassTwoChange}
            value={this.state.passTwo}
            type="password"
            placeholder="Repeat password"/>
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