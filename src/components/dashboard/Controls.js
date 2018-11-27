import React, { Component } from "react";
import { connect } from "react-redux";
import { addGroup, setInitialGroups, startAddGroup } from "../../actions/cardGroups";
import shortid from "shortid";
import { setCurrentGroup } from "../../actions/currentGroup";
import { resetRef } from "../../actions/support";



class Controls extends Component {

  handleAddGroup = () => {
    // this.props.dispatch(addGroup(id));
    // this.props.dispatch(setInitialGroups(this.props.token))
    this.props.startCreation();
    this.props.dispatch(startAddGroup(this.props.token))
  };

  componentWillMount(){
    if(this.props.refrence){
      this.handleAddGroup();
      this.props.dispatch(resetRef());
    }
  };
  handleRequestSupport = () => {
    this.props.redirect("/support");
  };

  handleShowList = () => {
    this.props.back();
  };
  render(){
    return (
      <div className="controls">
        <button onClick={this.handleAddGroup}>add</button>
        <button onClick={this.handleShowList}>list</button>
        <button onClick={this.handleRequestSupport}>support</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    refrence: state.support.isRef,
    token: state.auth.token
  }
};
export default connect(mapStateToProps)(Controls);