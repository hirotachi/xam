import React, {Component} from "react";
import { Login } from "../../actions/auth";


class LoginPage extends Component{
  state = {
    userName: "",
    password: "",
    remember: false
  };
  handleLogin = (e) => {
    e.preventDefault();
    this.props.login();
  };

  //=========================================
  handleUserNameChange = (e) => {
    const userName = e.target.value;
    this.setState(() => ({userName}))
  };
  handlePasswordChange = (e) => {
    const password = e.target.value;
    this.setState(() => ({password}))
  };
  //=========================================
  render() {
    return (
      <div>
        LoginPage
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