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

  componentDidMount() {
    const tag = document.querySelector(".home__intro");
    tag.classList.add("scale-right");
    tag.classList.remove("shrink");
    const logo = document.querySelector(".home__intro--logo");
    logo.classList.add("shrink-logo");
    const handleFormFieldsStyle = setTimeout(() => {
      const formFields = document.querySelectorAll(".form__field");
      for (let field of formFields){
        field.classList.remove("fieldReveal");
        field.style.opacity = 1;
      }
      clearTimeout(handleFormFieldsStyle)
    }, 1500);
  }

  componentDidUpdate() {
      const formFields = document.querySelectorAll(".form__field");
      for (let field of formFields){
        field.classList.remove("fieldReveal");
        field.style.opacity = 1;
      }
  }

  componentWillUnmount() {
    const tag = document.querySelector(".home__intro");
    tag.classList.add("shrink");
    tag.classList.remove("scale-right");
    const logo = document.querySelector(".home__intro--logo");
    logo.classList.remove("shrink-logo");
    this.props.dispatch(approveCred());
  }


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
          {this.state.error && <p className="err-msg">{this.state.error}</p>}
          {this.props.wrongCred && <p className="err-msg">Wrong username or password</p>}
            <input
              placeholder="Username"
              className={`form__field fieldReveal ${this.props.wrongCred ? "err-field" : ""}`}
              onChange={this.handleUserNameChange}
              value={this.state.userName}
              type="text"
            />
            <input
              placeholder="Password"
              className={`form__field fieldReveal ${this.props.wrongCred ? "err-field" : ""}`}
              onChange={this.handlePasswordChange}
              value={this.state.password}
              type="password"
            />
          <button className="btn form__login btn__secondary slide_right-in">Login</button>
        </form>
        <p className="form__text">need an account?
          <span className="form__text--link"
            onClick={this.props.resquestSignup}>sign up</span>
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
export default connect(mapStateToProps)(LoginForm);