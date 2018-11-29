import React, {Component} from "react";
import { connect } from "react-redux";
import {SearchIcon} from "../icons/icons";

class NavigationMobile extends Component{
  render(){
    return (
      <div>
        <SearchIcon />
        <p>XAM</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth.auth,
    support: state.support
  }
};

export default connect(mapStateToProps)(NavigationMobile);