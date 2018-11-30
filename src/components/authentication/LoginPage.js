import React, {Component} from "react";
import {approveCred, Login, requestLogin} from "../../actions/auth";
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
    if(screen.width <= 480){
      const bg = document.getElementsByClassName("home__mobile--bg")[0];
      bg.style.filter = "blur(3px)";
    }

  }
  componentWillUnmount() {
    if(screen.width <= 480){
      const bg = document.getElementsByClassName("home__mobile--bg")[0];
      bg.style.filter = "unset";
    }
  }

  handleFieldsFocus = () => {
    if(screen.width <= 480){
      const logo = document.getElementsByClassName("home__logo")[0];
      logo.style.fontSize = "0";
    }
  };
  handleFieldsBlur = () => {
    if(screen.width <= 480){
      const logo = document.getElementsByClassName("home__logo")[0];
      logo.style.fontSize = "10vh";
    }
  };

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
            placeholder="Username"
            onFocus={this.handleFieldsFocus}
            onBlur={this.handleFieldsBlur}
          />
          <input
            className={`login__form--field
            ${(this.props.wrongCred || this.state.fail)  && "err-field"}`
            }
            onChange={this.handlePasswordChange}
            value={this.state.password}
            type="password"
            placeholder="Password"
            onFocus={this.handleFieldsFocus}
            onBlur={this.handleFieldsBlur}
          />
          <button className="btn btn-primary btn-lg">Login</button>
        </form>
        <p className="login__signup">dont have an account yet ?
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