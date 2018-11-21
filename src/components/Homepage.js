import React, {Component} from "react";
import {connect} from"react-redux";
import LoginPage from "./authentication/LoginPage";
import { login, requestAuth } from "../actions/auth";
import SignupPage from "./authentication/SignupPage";


class Homepage extends Component{
  state = {
    login: false,
    signUp: false,
    guestLogin: false,
    buttons: true
  };
  componentDidMount(){
    if(this.props.auth){
      this.props.history.push("/dashboard");
    }
    if(this.props.isRef){
      this.handleSignUp();
    }
  };
  componentDidUpdate(){
    if(this.props.auth){
      this.props.history.push("/dashboard");
    }
  };

  //===============================================================
  handleLogin = () => {
    this.setState(() => ({login: true, signUp: false, guestLogin: false, buttons: false}));
  };
  handleSignUp = () => {
    this.setState(() => ({login: false, signUp: true, guestLogin: false, buttons: false}));
  };
  //===============================================================

  //===============================================================
  requestLogin = (info) => {
    this.props.dispatch(requestAuth(info));
  };
  //===============================================================

  render(){
    return (
      <div>
        <h1>XAM</h1>
        {(this.state.buttons) &&
        <div>
          <button onClick={this.handleLogin}>Login</button>
          <button onClick={this.handleSignUp}>SignUp</button>
        </div>
        }

        {this.state.login && <LoginPage login={this.requestLogin}/>}
        {this.state.signUp && <SignupPage signUp={this.requestLogin}/>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    isRef: state.support.isRef
  }
};
export default connect(mapStateToProps)(Homepage);