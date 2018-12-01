import React, {Component} from "react";
import {approveCred, Login, requestLogin} from "../../../actions/auth/auth";
import {connect} from "react-redux";
import LoginForm from "../forms/LoginForm";


class LoginPage extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.loginState && <LoginForm {...this.props}/>}
        {
          !this.props.loginState &&
          !this.props.signUpState &&
          <button onClick={this.props.show}>Login</button>
        }
      </React.Fragment>
    );
  }
}

export default connect()(LoginPage);