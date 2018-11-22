import React, { Component } from "react";
import { approveCred, Login, requestLogin } from "../../actions/auth";
import { connect } from "react-redux";


class LoginPage extends Component {
  state = {
    userName: "",
    password: "",
    remember: false,
    fail: false
  };

  handleLogin = (e) => {
    e.preventDefault();
    const {userName, password} = this.state;
    if ( !userName || !password ){
      this.setState(() => ({fail: true}))
    }else {
      this.setState(() => ({fail: false}));
      this.props.dispatch(requestLogin({userName, password}));
    }
  };

  //=========================================
  handleUserNameChange = (e) => {
    const userName = e.target.value;
    this.setState(() => ({ userName }));
    this.props.dispatch(approveCred());
  };
  handlePasswordChange = (e) => {
    const password = e.target.value;
    this.setState(() => ({ password }));
    this.props.dispatch(approveCred());
  };

  //=========================================
  render() {
    return (
      <div>
        LoginPage
        {this.state.fail && <p>Enter username and password</p>}
        {this.props.wrongCred && <p>Wrong password or Username</p>}
        <form onSubmit={this.handleLogin}>
          <input
            onChange={this.handleUserNameChange}
            value={this.state.userName}
            type="text"
            placeholder="Username"/>
          <input
            onChange={this.handlePasswordChange}
            value={this.state.password}
            type="password"
            placeholder="password"/>
          <button>Login</button>
          <label htmlFor="remember"><input type="checkbox" id="remember"/> Remember Me</label>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    wrongCred: state.auth.wrongCred
  }
};

export default connect(mapStateToProps)(LoginPage);