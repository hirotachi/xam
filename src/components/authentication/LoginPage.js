import React, {Component} from "react";
import {approveCred, Login, requestLogin} from "../../actions/auth";
import {Link} from "react-router-dom";
import {connect} from "react-redux";


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
    if (!userName || !password) {
      this.setState(() => ({fail: true}))
    } else {
      this.setState(() => ({fail: false}));
      this.props.dispatch(requestLogin({userName, password}));
    }
  };

  componentDidMount() {
    const logo = document.getElementsByClassName("home__logo")[0];
    logo.classList.add("test");
    const bg = document.getElementsByClassName("home__mobile--bg")[0];
    bg.style.filter = "blur(3px)";
  }
  componentWillUnmount() {
    const bg = document.getElementsByClassName("home__mobile--bg")[0];
    bg.style.filter = "unset";
    const logo = document.getElementsByClassName("home__logo")[0];
    logo.classList.remove("test");
  }

  //=========================================
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

  //=========================================
  render() {
    return (
      <div className="login">
        {this.state.fail &&
        <p className="err-msg">Enter username and password</p>
        }
        {this.props.wrongCred &&
        <p className="err-msg">Wrong password or Username</p>
        }
        <form className="login__form" onSubmit={this.handleLogin}>
          <input
            className={`login__form--field
            ${(this.props.wrongCred || this.state.fail)  && "err-field"}`
            }
            onChange={this.handleUserNameChange}
            value={this.state.userName}
            type="text"
            placeholder="Username"/>
          <input
            className={`login__form--field
            ${(this.props.wrongCred || this.state.fail)  && "err-field"}`
            }
            onChange={this.handlePasswordChange}
            value={this.state.password}
            type="password"
            placeholder="Password"/>
          <button className="btn btn-primary btn-lg ">Login</button>

          {/*<label htmlFor="remember"><input type="checkbox" id="remember"/> Remember Me</label>*/}
        </form>
        <p>dont have an account yet
          <span className="link" onClick={this.props.resquestSignup}>signUp</span>
        </p>
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