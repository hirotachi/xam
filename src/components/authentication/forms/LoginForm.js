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
  handleFormSubmit = () => {
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
          <div>
            <input
              onChange={this.handleUserNameChange}
              value={this.state.userName}
              type="text"
            />
          </div>
          <div>
            <input
              onChange={this.handlePasswordChange}
              value={this.state.password}
              type="password"
            />
          </div>
          <button>Login</button>
        </form>
      </div>
    );
  }
}
export default connect()(LoginForm);