import React, {Component} from "react";
import {connect} from "react-redux";
import {setCurrentGroup, startEdit} from "../../../../actions/currentGroup";
import {startRemoveGroup} from "../../../../actions/cardGroups";
import QuizzSettings from "../../quizzSetup/QuizzSettings";
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
      <div>
        {/*<h2>{this.state.title}</h2>*/}
        {/*<p>Number of cards in this group: {this.state.cards.length}</p>*/}
        {/*<button onClick={this.handleStartEdit}>Edit</button>*/}
        {/*<button onClick={this.handleRemoveGroup}>remove</button>*/}
        {/*<button onClick={this.handleViewGroup}>View</button>*/}
        {/*<button onClick={this.handlestartQuizzSetup}>start</button>*/}
        {/*{this.state.quizzSetting &&*/}
        {/*<QuizzSettings*/}
        {/*end={this.handleEndQuizzSetup}*/}
        {/*id={this.state.id}*/}
        {/*redirect={this.props.redirect}*/}
        {/*cards={this.props.cards}*/}
        {/*/>*/}
        {/*}*/}

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
      </div>
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