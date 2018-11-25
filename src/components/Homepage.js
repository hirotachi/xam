import React, { Component } from "react";
import { connect } from "react-redux";
import LoginPage from "./authentication/LoginPage";
import { login, requestAuth } from "../actions/auth";
import SignupPage from "./authentication/SignupPage";
import Responsive from "../Responsive/Responsive";


class Homepage extends Component {
  state = {
    login: false,
    signUp: false,
    guestLogin: false,
    buttons: true,
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

  //  check for window resize and resize the bg accordingly
    window.addEventListener("resize", this.handleResize);
    this.setState(() => ({originalHeight: window.innerHeight}));
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

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  //===============================================================
  // handle resize
  handleResize = () => {
    const screenWidth = screen.width;
    if(screenWidth <= 768 && clientInformation.appVersion.toLowerCase().includes("nexus") &&
    screen.orientation.type.toLowerCase().includes("portrait")){
      this.setState(() => ({consoleOpen: false}))
    } else if(screenWidth > 1024 && clientInformation.appVersion.toLowerCase().includes("nexus")
    || this.state.originalHeight > window.innerHeight){
      this.setState(() => ({consoleOpen: true}))
    }else if (clientInformation.appVersion.toLowerCase().includes("iphone")
    && screen.orientation.type.toLowerCase().includes("landscape")){
      this.setState(() => ({consoleOpen: true}))
    }else if (screenWidth > 768 && screenWidth < 1024){
      this.setState(() => ({consoleOpen: false}))
    }else if (screenWidth < 768 && screenWidth > 480){
      this.setState(() => ({consoleOpen: false}))
    }
    if(this.state.originalHeight === window.innerHeight){
      this.setState(() => ({consoleOpen: false}))
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
  handleBackHome = () => {
    this.setState(() => ({ login: false, signUp: false, guestLogin: false, buttons: true }));
  };
  //===============================================================

  render() {
    return (
      <div className="home">
        <Responsive query={{minWidth: 480}}>
          <div className="home__bg">
            <video autoPlay muted loop className="home__bg--video"
                   style={this.state.consoleOpen ? {width: "100%"} : {height: "100vh"}}>
              <source src="bg/video-bg.mp4" type="video/mp4"/>
            </video>
          </div>
        </Responsive>


        <h1 className="home__logo" onClick={this.handleBackHome}>XAM</h1>
        {(this.state.buttons) &&
        <div className="home__buttons">
          <button className="btn btn-green" onClick={this.handleLogin}>Login</button>
          <button className="btn btn-blue" onClick={this.handleSignUp}>SignUp</button>
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