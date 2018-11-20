import React, { Component } from "react";
import { connect } from "react-redux";
import { enterSupport, leaveSupport } from "../actions/support";


class Supportpage extends Component{
  componentDidMount(){
    this.props.dispatch(enterSupport());

  }
  componentWillUnmount(){
    this.props.dispatch(leaveSupport());
  }
  render(){
    return (
      <div>
        support page
      </div>
    );
  }
}

export default connect()(Supportpage);