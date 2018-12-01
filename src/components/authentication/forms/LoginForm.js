import React, {Component} from "react";
import {connect} from "react-redux";
import {approveCred, requestLogin} from "../../../actions/auth/auth";
import shortId from "shortid";


class LoginForm extends Component {
  state = {
    userName: "",
    password: "",
    error: false
  };

  // componentWillMount() {
  //   const tag = document.getElementsByClassName("home__intro")[0];
  //   tag.classList.add("scale-right");
  //   tag.classList.remove("shrink");
  // }
  // componentWillUnmount() {
  //   const tag = document.getElementsByClassName("home__intro")[0];
  //   tag.classList.add("shrink");
  //   tag.classList.remove("scale-right");
  // }


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
  handleFormSubmit = (e) => {
    e.preventDefault();
    const {userName, password} = this.state;
    if (!userName || !password) {
      this.setState(() => ({error: "Username and password needed"}))
    } else {
      this.setState(() => ({error: false}));
      this.props.dispatch(requestLogin({userName, password}));
    }
  };
  //===============================================
  render() {
    return (
      <div className="login">
        <form className="login__form form" onSubmit={this.handleFormSubmit}>
          {this.state.error && <p>{this.state.error}</p>}
          {this.props.wrongCred && <p>Wrong username or password</p>}
          <div className="form__field">
            <input
              placeholder="Username"
              className={this.props.wrongCred ? "err-field" : ""}
              onChange={this.handleUserNameChange}
              value={this.state.userName}
              type="text"
            />
          </div>
          <div className="form__field" >
            <input
              placeholder="Password"
              className={this.props.wrongCred ? "err-field" : ""}
              onChange={this.handlePasswordChange}
              value={this.state.password}
              type="password"
            />
          </div>
          <button>Login</button>
        </form>
        <p>need an account? <span onClick={this.props.resquestSignup}>sign up</span></p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    wrongCred: state.auth.wrongCred
  }
};
export default connect(mapStateToProps)(LoginForm);