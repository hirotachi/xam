import React, {Component} from "react";
import {approveCred, Login, requestLogin} from "../../../actions/auth/auth";
import {connect} from "react-redux";
import LoginForm from "../forms/LoginForm";


class LoginPage extends Component {
  state = {
    showButton: true
  };
  hideButton = () => {
    this.setState(() => ({showButton: false}));
  };

  render() {
    return (
      <React.Fragment>
        {this.props.loginState && <LoginForm {...this.props}/>}
        {
          !this.props.loginState &&
          !this.props.signUpState &&
          <button
            className={`btn btn__primary btn--dark login__btn
            slide_right-in
            `}
            onClick={this.props.show}
          >Login</button>
        }
      </React.Fragment>
    );
  }
}

export default connect()(LoginPage);