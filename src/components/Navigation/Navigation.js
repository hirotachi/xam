import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import Search from "./Search";


class Navigation extends Component {


  handleAuth = () => {
    this.props.dispatch(logout());
  };


  render() {
    return (
      <div>
        <Search/>

        {
          this.props.auth && <button onClick={this.handleAuth}>Logout</button>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
};

export default connect(mapStateToProps)(Navigation);