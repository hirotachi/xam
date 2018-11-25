import React, { Component } from "react";
import { connect } from "react-redux";
import { requestLogout } from "../../actions/auth";
import Search from "./Search";
import Responsive from "../../Responsive/Responsive";
import { setRef } from "../../actions/support";


class Navigation extends Component {


  handleLogout = () => {
    this.props.dispatch(requestLogout());
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
              <button onClick={this.handleLogout}>Logout</button> :
              <React.Fragment>
                {
                  this.props.redirect.location.pathname !== "/" &&
                    <div>
                      <button onClick={this.handleSignUp}>Sign Up</button>
                      <button>Login</button>
                    </div>
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