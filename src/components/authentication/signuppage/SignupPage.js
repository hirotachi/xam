import React, {Component} from "react";
import {connect} from "react-redux";
import {resetRef} from "../../../actions/support";
import SignUpForm from "../forms/SignUpForm";


class SignupPage extends Component {

  render() {
    return (
      <React.Fragment>
        {this.props.signUpState && <SignUpForm {...this.props}/>}
        {!this.props.signUpState &&
        !this.props.loginState &&
        <button
          className={`btn btn__primary btn--green signUp__btn
          ${screen.width > 480 ? "slide_right-in" : "slide_left-in"}`}

          onClick={this.props.show}
        >Signup</button>
        }
      </React.Fragment>
    );
  }
}

export default connect()(SignupPage);