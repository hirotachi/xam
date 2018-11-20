import React, {Component} from "react";
import {connect} from "react-redux";
import { resetRef } from "../actions/support";

export default (ChildComponent) => {
  class ComposedComponent extends Component{
    componentDidMount() {
      this.props.dispatch(resetRef());
      if(!this.props.auth){
        this.props.history.push("/");
      }
    }
    componentDidUpdate(){
      if(!this.props.auth){
        this.props.history.push("/");
      }
    }
    render(){
      return <ChildComponent {...this.props} />;
    }
  }
  const mapStateToProps = (state) => {
    return {
      auth: state.auth
    }
  };
  return connect(mapStateToProps)(ComposedComponent);
}