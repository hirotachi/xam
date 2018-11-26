import React, { Component } from "react";
import { connect } from "react-redux";
import LoginPage from "./authentication/LoginPage";
import { login, requestAuth } from "../actions/auth";
import SignupPage from "./authentication/SignupPage";
import Responsive from "../Responsive/Responsive";


class Homepage extends Component {
  state = {
    login: false,
    signUp: true,
    guestLogin: false,
    buttons: false,
    consoleOpen: false,
    originalHeight: 0
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
  //===============================================================
  handleLogin = () => {
    if(this.state.signUp){ // check if page already on login and apply animation
      const signUpPage = document.getElementsByClassName("signUp")[0];
      signUpPage.style.transform = "translate(100%)";
      const slide = setTimeout(() =>
          this.setState(() => ({ login: true, signUp: false, guestLogin: false, buttons: false }))
        ,500)
    }else {
      this.setState(() => ({ login: true, signUp: false, guestLogin: false, buttons: false }));
    }
  };
  handleSignUp = () => {
    if(this.state.login){ // check if page already on login and apply animation
     const loginPage = document.getElementsByClassName("login")[0];
      loginPage.style.transform = "translate(100%)";
      const slide = setTimeout(() =>
        this.setState(() => ({ login: false, signUp: true, guestLogin: false, buttons: false }))
    ,500)
    }else {
      this.setState(() => ({ login: false, signUp: true, guestLogin: false, buttons: false }));
    }
  };
  //===============================================================
  handleBackHome = () => {
    this.setState(() => ({ login: false, signUp: false, guestLogin: false, buttons: true }));
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
        <Responsive query={{maxWidth: 480}}>
          <img src="https://i.ibb.co/VQ63nWb/1.jpg" alt="bg" className="home__mobile--bg"/>
        </Responsive>

        <h1 className="home__logo" onClick={this.handleBackHome}>XAM</h1>
        {(this.state.buttons) &&
        <div className="home__buttons">
          <button className="btn btn-primary btn-lg" onClick={this.handleLogin}>Login</button>
          <button className="btn btn-blue btn-lg" onClick={this.handleSignUp}>SignUp</button>
        </div>
        }

        {this.state.login && <LoginPage login={this.requestLogin} resquestSignup={this.handleSignUp}/>}
        {this.state.signUp && <SignupPage requestLogin={this.handleLogin}/>}
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