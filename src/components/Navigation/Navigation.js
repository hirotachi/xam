import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import Search from "./Search";
import Responsive from "../../Responsive/Responsive";
import { setRef } from "../../actions/support";


class Navigation extends Component {


  handleAuth = () => {
    this.props.dispatch(logout());
  };

  handleSignUp = () => {
    this.props.dispatch(setRef(this.props.redirect.location.pathname));
    this.props.redirect.history.push("/");
  };


  render() {
    return (
      <div>
        {
          !this.props.support.isSupport &&
          <React.Fragment>
            {
              this.props.auth &&
              <Search/>
            }
          </React.Fragment>
        }
        <Responsive query={{ minWidth: 480 }}>
          {
            this.props.auth ?
              <button onClick={this.handleAuth}>Logout</button> :
              <React.Fragment>
                {
                  this.props.redirect.location.pathname !== "/" &&
                  <button onClick={this.handleSignUp}>Sign Up</button>
                }
              </React.Fragment>
          }
        </Responsive>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth.auth,
    support: state.support
  }
};

export default connect(mapStateToProps)(Navigation);