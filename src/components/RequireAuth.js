import React, {Component} from "react";
import {connect} from "react-redux";

export default (ChildComponent) => {
  class ComposedComponent extends Component{
    componentDidMount() {
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
      return <ChildComponent/>;
    }
  }
  const mapStateToProps = (state) => {
    return {
      auth: state.auth
    }
  };
  return connect(mapStateToProps)(ComposedComponent);
}