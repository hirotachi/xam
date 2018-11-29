import React, {Component} from "react";
import {connect} from "react-redux";
import {setCurrentGroup, startEdit} from "../../../../actions/currentGroup";
import {startRemoveGroup} from "../../../../actions/cardGroups";
import {startEditControls} from "../../../../actions/controls";
import Responsive from "../../../../Responsive/Responsive";
import ShallowCardMobile from "./ShallowCardMobile";
import ShallowCardDesktop from "./ShallowCardDesktop";

class ShallowCard extends Component {
  state = {
    id: this.props._id,
    title: this.props.title,
    cards: this.props.cards,
    quizzSetting: false
  };
  handleStartEdit = () => {
    this.props.dispatch(startEdit(this.props._id));
    this.props.dispatch(startEditControls());
    this.props.edit();
  };

  //================================================
  handlestartQuizzSetup = () => {
    this.setState(() => ({quizzSetting: true}));
  };
  handleEndQuizzSetup = () => {
    this.setState(() => ({quizzSetting: false}));
  };
  //================================================


  handleRemoveGroup = () => {
    this.props.dispatch(startRemoveGroup(this.props._id, this.props.token, this.props.groups));
  };

  handleViewGroup = () => {
    this.props.view();
    this.props.dispatch(setCurrentGroup(this.state.id));
  };

  render() {
    return (
      <React.Fragment>
        <Responsive query={{maxWidth: 480}}>
          <ShallowCardMobile
            {...this.props}
            editGroup={this.handleStartEdit}
            removeGroup={this.handleRemoveGroup}
            viewGroup={this.handleViewGroup}
          />
        </Responsive>
        <Responsive query={{minWidth: 480}}>
          <ShallowCardDesktop
            editGroup={this.handleStartEdit}
            removeGroup={this.handleRemoveGroup}
            viewGroup={this.handleViewGroup}
            {...this.props}
          />
        </Responsive>
      </React.Fragment>
    );

  }
}

const mapStateToProps = (state) => {
  return {
    groups: state.groups,
    token: state.auth.token
  }
};

export default connect(mapStateToProps)(ShallowCard);