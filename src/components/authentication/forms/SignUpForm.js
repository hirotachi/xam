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

  //Input handlers=======================================================
  handleUserNameChange = (e) => {
    const userName = e.target.value;
    this.setState(() => ({userName, userNameFormatError: false}));
    this.resetError("userName");
  };
  handleEmailChange = (e) => {
    const email = e.target.value;
    this.setState(() => ({email}));
    this.resetError("email");
  };
  handlePasswordChange = (e) => {
    const password = e.target.value;
    this.setState(() => ({password}));
    this.resetError("password");
    this.resetError("confirmPass");
    this.props.dispatch(passMatch());
  };
  handleConfirmPassChange = (e) => {
    const confirmPass = e.target.value;
    this.setState(() => ({confirmPass}));
    this.resetError("confirmPass");
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
        this.setState(() => ({userNameFormatError: "Minimum 6 and maximum 12"}))
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
      .then(( ) => {
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
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <div>
            {this.props.auth.userNameUsed && <p>Username already used</p>}
            {this.state.userNameFormatError && <p>{this.state.userNameFormatError}</p>}
            <input
              id="userName"
              onChange={this.handleUserNameChange}
              value={this.state.userName}
              type="text"
              onBlur={this.handleField}
            />
          </div>
          <div>
            {this.props.auth.emailUsed && <p>Email already used</p>}
            {this.props.auth.emailFormat && <p>Need a valid email</p>}
            <input
              className={(this.props.auth.emailUsed || this.props.auth.emailFormat) ?
                "err-field" : ""}
              id="email"
              onChange={this.handleEmailChange}
              value={this.state.email}
              type="text"
              onBlur={this.handleField}
            />
          </div>
          <div>
            <input
              id="password"
              onChange={this.handlePasswordChange}
              value={this.state.password}
              type="password"
            />
          </div>
          <div>
            {this.props.auth.passMatch && <p>passwords does not match</p>}
            <input
              className={this.props.auth.passMatch ? "err-field" : ""}
              id="confirmPass"
              onChange={this.handleConfirmPassChange}
              value={this.state.confirmPass}
              type="password"
              onBlur={this.handleField}
            />
          </div>
          <div>
            <input
              id="terms"
              onChange={this.handleTermsChange}
              value={this.state.terms}
              type="checkbox"
            />
            <p>I agree to terms of service</p>
          </div>
          <button>sign up</button>
        </form>
        <p>Already have an account ? <span onClick={this.props.requestLogin}>Login</span></p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
};

export default connect(mapStateToProps)(SignUpForm);