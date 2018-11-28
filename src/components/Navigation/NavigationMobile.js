import React, {Component} from "react";
import { connect } from "react-redux";

class NavigationMobile extends Component{
  render(){
    return (
      <div>
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