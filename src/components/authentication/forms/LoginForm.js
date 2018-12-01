import React, {Component} from "react";
import {connect} from "react-redux";
import {approveCred, requestLogin} from "../../../actions/auth/auth";


class LoginForm extends Component {
  state ={
    userName: "",
    password: "",
    error: false
  };

  //Input handlers===============================================
  handleUserNameChange = (e) => {
    const userName = e.target.value;
    this.setState(() => ({userName}));
    this.props.dispatch(approveCred());
  };
  handlePasswordChange = (e) => {
    const password = e.target.value;
    this.setState(() => ({password}));
    this.props.dispatch(approveCred());
  };
  //Submit handler===============================================
  handleFormSubmit = (e) => {
    e.preventDefault();
    const {userName, password} = this.state;
    if(!userName || !password){
      this.setState(() => ({error: "Username and password needed"}))
    }else {
      this.setState(() => ({error: false}));
      this.props.dispatch(requestLogin({userName, password}));
    }
  };
  //===============================================
  render(){
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          {this.state.error && <p>{this.state.error}</p>}
          {this.props.wrongCred && <p>Wrong username or password</p>}
          <div>
            <input
              className={this.props.wrongCred ? "err-field" : ""}
              onChange={this.handleUserNameChange}
              value={this.state.userName}
              type="text"
            />
          </div>
          <div>
            <input
              className={this.props.wrongCred ? "err-field" : ""}
              onChange={this.handlePasswordChange}
              value={this.state.password}
              type="password"
            />
          </div>
          <button>Login</button>
        </form>
        <p>Don't have an account yet? <span onClick={this.props.resquestSignup}>sign up</span></p>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    wrongCred: state.auth.wrongCred
  }
};
export default connect(mapStateToProps)(LoginForm);