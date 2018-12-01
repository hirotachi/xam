import React, {Component} from "react";
import {connect} from "react-redux";
import LoginPage from "./authentication/loginpage/LoginPage";
import {login, requestAuth} from "../actions/auth/auth";
import SignupPage from "./authentication/signuppage/SignupPage";
import Responsive from "../Responsive/Responsive";
import LoginForm from "./authentication/forms/LoginForm";
import SignUpForm from "./authentication/forms/SignUpForm";


class Homepage extends Component {
  state = {
    login: true,
    signUp: false,
    guestLogin: false,
    buttons: true,
    consoleOpen: false,
    originalHeight: 0
  };

  componentWillMount() {
    if (localStorage.xamUser) {
      const {token} = JSON.parse(localStorage.xamUser);
      this.props.dispatch(login(token))
    }
  }

  componentDidMount() {
    if (this.props.auth) {
      this.props.history.push("/dashboard");
    }
    if (this.props.isRef && this.props.isRef.request === "signup") {
      this.handleSignUp();
    } else if (this.props.isRef && this.props.isRef.request === "login") {
      this.handleLogin();
    }
  };

  componentDidUpdate() {
    if (localStorage.xamUser) {
      const xamUser = JSON.parse(localStorage.xamUser);
      this.props.dispatch(login(xamUser.token))
    }
    if (this.props.auth) {
      this.props.history.push("/dashboard");
    }
  };

  //===============================================================
  //===============================================================
  handleLogin = () => {
    if (this.state.signUp) { // check if page already on login and apply animation
      this.setState(() => ({login: true, signUp: false, guestLogin: false, buttons: false}))
    } else {
      this.setState(() => ({login: true, signUp: false, guestLogin: false, buttons: false}));
    }
  };
  handleSignUp = () => {
    if (this.state.login) { // check if page already on login and apply animation
      this.setState(() => ({login: false, signUp: true, guestLogin: false, buttons: false}))
    } else {
      this.setState(() => ({login: false, signUp: true, guestLogin: false, buttons: false}));
    }
  };
  //===============================================================
  handleBackHome = () => {
    this.setState(() => ({login: false, signUp: false, guestLogin: false, buttons: true}));
  };

  //===============================================================

  render() {
    return (
      <div className="home">
        <Responsive query={{minWidth: 480}}>
          <div className="home__bg">
            <video autoPlay muted loop className="home__bg--video">
              <source src="bg/video-bg.mp4" type="video/mp4"/>
            </video>
          </div>
        </Responsive>
        <div className="home__intro">
          <p className="home__intro--logo" onClick={this.handleBackHome}>XAM</p>
          <div className="home__intro--forms">
            <LoginPage
              show={this.handleLogin}
              signUpState={this.state.signUp}
              loginState={this.state.login}
              resquestSignup={this.handleSignUp}
            />
            <SignupPage
              show={this.handleSignUp}
              loginState={this.state.login}
              signUpState={this.state.signUp}
              requestLogin={this.handleLogin}
            />
          </div>
        </div>
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