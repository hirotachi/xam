import React, { Component } from "react";
import { connect } from "react-redux";
import { addGroup, setInitialGroups, startAddGroup } from "../../../actions/cardGroups";
import shortid from "shortid";
import { setCurrentGroup } from "../../../actions/currentGroup";
import { resetRef } from "../../../actions/support";
import ControlsMobile from "./ControlsMobile";
import Responsive from "../../../Responsive/Responsive";



class Controls extends Component {

  handleAddGroup = () => {
    this.props.startCreation();
    this.props.dispatch(startAddGroup(this.props.token))
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


        <Responsive query={{maxWidth: 480}}>
          {
            !(this.props.controls.startCreate || this.props.controls.startEdit) &&
            <ControlsMobile startCreation={this.handleAddGroup}/>
          }
        </Responsive>
        <Responsive query={{minWidth: 769}}>
          <button onClick={this.handleAddGroup}>add</button>
          <button onClick={this.handleShowList}>list</button>
          <button onClick={this.handleRequestSupport}>support</button>
        </Responsive>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    refrence: state.support.isRef.location,
    token: state.auth.token,
     controls: state.controls
  }
};
export default connect(mapStateToProps)(Controls);