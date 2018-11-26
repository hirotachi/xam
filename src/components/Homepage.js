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
            <video autoPlay muted loop className="home__bg--video">
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