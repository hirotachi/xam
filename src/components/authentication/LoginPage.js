import React, { Component } from "react";
import { Login } from "../../actions/auth";


class LoginPage extends Component {
  state = {
    userName: "",
    password: "",
    remember: false,
    fail: false
  };
  handleLogin = (e) => {
    e.preventDefault();
    if ( !this.state.userName || !this.state.password ){
      this.setState(() => ({fail: true}))
    }else {
      this.setState(() => ({fail: false}));
      this.props.login();
    }
  };

  //=========================================
  handleUserNameChange = (e) => {
    const userName = e.target.value;
    this.setState(() => ({ userName }))
  };
  handlePasswordChange = (e) => {
    const password = e.target.value;
    this.setState(() => ({ password }))
  };

  //=========================================
  render() {
    return (
      <div>
        LoginPage
        {this.state.fail && <p>enter username or password</p>}
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

export default LoginPage;