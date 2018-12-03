import React, {Component} from "react";
import {connect} from "react-redux";
import {
  approveCred, requestSignup,
  requestUserNameCheck
} from "../../../actions/auth/auth";
import {passMatch, passNotMatch, checkEmail} from "../../../actions/auth/fieldsCheck";

class SignUpForm extends Component {
  state = {
    userName: "",
    email: "",
    password: "",
    confirmPass: "",
    terms: false,
    success: false,
    userNameFormatError: false
  };

  //==================================================================
  componentDidMount() {
    const tag = document.querySelector(".home__intro");
    tag.classList.add("scale-right");
    tag.classList.remove("shrink");
    const logo = document.querySelector(".home__intro--logo");
    logo.classList.add("shrink-logo");
    const removeFieldAnimation = setTimeout(() => { // remove field reveal animation on component mount
      const fields = document.querySelectorAll(".form__field");
      for (let field of fields){
        field.style.opacity = 1;
        field.classList.remove("fieldReveal");
      }
      clearTimeout(removeFieldAnimation)
    }, 1000)
  }

  componentWillUnmount() {
    this.props.dispatch(passMatch());
    const tag = document.querySelector(".home__intro");
    tag.classList.add("shrink");
    tag.classList.remove("scale-right");
    const logo = document.querySelector(".home__intro--logo");
    logo.classList.remove("shrink-logo");
    const forms = document.querySelector(".home__intro--forms");
      const fields = document.querySelectorAll(".form__field");
      for (let field of fields){
        field.style.opacity = 1;
        field.classList.add("fieldReveal");
      }
  }

  //Input handlers=======================================================
  handleUserNameChange = (e) => {
    const userName = e.target.value;
    this.setState(() => ({userName, userNameFormatError: false}));
  };
  handleEmailChange = (e) => {
    const email = e.target.value;
    this.setState(() => ({email}));
  };
  handlePasswordChange = (e) => {
    const password = e.target.value;
    this.setState(() => ({password}));
    this.props.dispatch(passMatch());
  };
  handleConfirmPassChange = (e) => {
    const confirmPass = e.target.value;
    this.setState(() => ({confirmPass}));
    this.props.dispatch(passMatch());
  };
  handleTermsChange = (e) => {
    const terms = e.target.checked;
    this.setState(() => ({terms}));
    this.resetError("terms");
  };
  //==============================
  resetError = (fieldId) => {
    const tag = document.getElementById(fieldId);
    tag.classList.remove("err-field");
  };
  addErrorToField = (fieldId) => {
    const tag = document.getElementById(fieldId);
    tag.classList.add("err-field");
  };
  //Fields handler=======================================================
  handleField = (e) => { // check if the username and email already used
    const {email, confirmPass, password} = this.state;
    const field = e.target.id;
    if (field === "email" && !email) {
      this.addErrorToField(field)
    }
    if (field === "email" && !!email) {
      this.props.dispatch(checkEmail(email));
      this.resetError(field)
    } else if (field === ("confirmPass" || "password")) {
      if (password === confirmPass) {
        this.props.dispatch(passMatch());
        this.resetError("password");
        this.resetError("confirmPass");
      } else {
        this.addErrorToField("password");
        this.addErrorToField("confirmPass");
        this.props.dispatch(passNotMatch());
      }
    }
  };
  submitCheck = (object) => { // pass every object as a string and value to single checker
    Object.entries(object).forEach(([key, value]) => this.singleFieldCheck(value, key))
  };
  singleFieldCheck = (field, name) => { // check each field and give style according to condition
    if (name !== "success" && name !== "userNameFormatError") {
      const tag = document.getElementById(name);
      if (!field && name === "userName") {
        this.checkUserNameField()
      } else if (!field) {
        tag.classList.add("err-field");
      } else {
        tag.classList.remove("err-field");
      }
    }
  };
  checkUserNameField = () => { // checks username length and special characters
    return new Promise((resolve, reject) => {
      const regex = /^[a-zA-Z0-9!@#$%^&*)(+=._-]+$/g;
      if (!this.state.userName) {
        this.addErrorToField("userName");
        this.setState(() => ({userNameFormatError: "Username cannot be empty"}));
      } else if (!regex.test(this.state.userName)) {
        this.addErrorToField("userName");
        this.setState(() => ({userNameFormatError: "No special Characters allowed"}));
      } else if (this.state.userName.length < 6 || this.state.userName.length > 12) {
        this.addErrorToField("userName");
        this.setState(() => ({userNameFormatError: "username minimum length 6 and maximum 12"}))
      } else {
        this.resetError("userName");
        this.setState(() => ({userNameFormatError: false}));
        this.props.dispatch(requestUserNameCheck(this.state.userName));
        resolve()
      }
    });

  };
  //Submit handler=======================================================
  handleFormSubmit = (e) => {
    const allFields = [];
    e.preventDefault();
    this.submitCheck(this.state);
    Object.entries(this.state).map(([key, value]) => {
      if (key !== "success" && key !== "userNameFormatError") {
        allFields.push(!!value);
      }
    });

    this.checkUserNameField()
      .then(() => {
        if (allFields.indexOf(false) === -1 &&
          !this.props.auth.passMatch &&
          !this.props.auth.emailFormat
          && !this.state.userNameFormatError) {
          const {userName, email, password} = this.state;
          this.props.dispatch(requestSignup({userName, email, password}))
        }
      })
  };

  //=======================================================
  render() {
    return (
      <React.Fragment>
        <form className="form" onSubmit={this.handleFormSubmit}>
          <div className="form__errors">
            {this.props.auth.userNameUsed && <p className="err-msg">Username already used</p>}
            {this.state.userNameFormatError && <p className="err-msg form__msg">{this.state.userNameFormatError}</p>}
            {this.props.auth.emailUsed && <p className="err-msg">Email already used</p>}
            {this.props.auth.emailFormat && <p className="err-msg">Need a valid email</p>}
            {this.props.auth.passMatch && <p className="err-msg">passwords does not match</p>}
          </div>
            <input
              className={`form__field fieldReveal`}
              placeholder="Username"
              id="userName"
              onChange={this.handleUserNameChange}
              value={this.state.userName}
              type="text"
              onBlur={this.handleField}
            />
            <input
              className={`${(this.props.auth.emailUsed || this.props.auth.emailFormat) ?
                "err-field" : ""} form__field fieldReveal`}
              placeholder="Email"
              id="email"
              onChange={this.handleEmailChange}
              value={this.state.email}
              type="text"
              onBlur={this.handleField}
            />
            <input
              className={`form__field fieldReveal`}
              placeholder="Password"
              id="password"
              onChange={this.handlePasswordChange}
              value={this.state.password}
              type="password"
            />
            <input
              className={`${this.props.auth.passMatch ? "err-field" : ""} form__field fieldReveal`}
              placeholder="Confirm password"
              id="confirmPass"
              onChange={this.handleConfirmPassChange}
              value={this.state.confirmPass}
              type="password"
              onBlur={this.handleField}
            />
          <div className="form__checkbox">
            <label className="checkbox__container">
              <span className="checkbox__label">I agree to terms of service</span>
              <input
                id="terms"
                onChange={this.handleTermsChange}
                value={this.state.terms}
                type="checkbox"
              />
              <span className="checkbox__checkmark"/>
            </label>
          </div>
          <button className="form__signUp slide_right-in">sign up</button>
        </form>
        <p className="form__text">
          Already have an account?
          <span className="form__text--link" onClick={this.props.requestLogin}>Login</span>
        </p>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
};

export default connect(mapStateToProps)(SignUpForm);