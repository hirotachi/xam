import React, { Component } from "react";
import { connect } from "react-redux";
import LoginPage from "./authentication/LoginPage";
import { login, requestAuth } from "../actions/auth";
import SignupPage from "./authentication/SignupPage";


class Homepage extends Component {
  state = {
    login: false,
    signUp: false,
    guestLogin: false,
    buttons: true
  };

  componentWillMount() {
    if(localStorage.xamUser){
      const { token } = JSON.parse(localStorage.xamUser);
      this.props.dispatch(login(token))
    }
  }

  componentDidMount() {
    if ( this.props.auth ) {
      this.props.history.push("/dashboard");
    }
    if ( this.props.isRef ) {
      this.handleSignUp();
    }
  };

  componentDidUpdate() {
    if ( localStorage.xamUser ) {
      const xamUser = JSON.parse(localStorage.xamUser);
      this.props.dispatch(login(xamUser.token))
    }
    if ( this.props.auth ) {
      this.props.history.push("/dashboard");
    }
  };

  //===============================================================
  handleLogin = () => {
    this.setState(() => ({ login: true, signUp: false, guestLogin: false, buttons: false }));
  };
  handleSignUp = () => {
    this.setState(() => ({ login: false, signUp: true, guestLogin: false, buttons: false }));
  };
  //===============================================================

  //===============================================================

  render() {
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
        {this.state.signUp && <SignupPage/>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth.auth,
    isRef: state.support.isRef
  }
};
export default connect(mapStateToProps)(Homepage);