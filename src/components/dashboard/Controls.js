import React, { Component } from "react";
import { connect } from "react-redux";
import { addGroup } from "../../actions/cardGroups";
import shortid from "shortid";
import { setCurrentGroup } from "../../actions/currentGroup";



class Controls extends Component {

  handleAddGroup = () => {
    const id = shortid();
    this.props.dispatch(addGroup(id));
    this.props.dispatch(setCurrentGroup(id));
    this.props.startCreation();
  };

  handleRequestSupport = () => {
    this.props.redirect("/support");
  };

  handleShowList = () => {
    this.props.back();
  };
  render(){
    return (
      <div>
        <button onClick={this.handleAddGroup}>add</button>
        <button onClick={this.handleShowList}>list</button>
        <button onClick={this.handleRequestSupport}>support</button>
      </div>
    );
  }
}

export default connect()(Controls);