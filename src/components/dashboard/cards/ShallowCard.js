import React, { Component } from "react";
import { connect } from "react-redux";
import { setCurrentGroup, startEdit } from "../../../actions/currentGroup";
import { removeGroup } from "../../../actions/cardGroups";
import QuizzSettings from "../QuizzSettings";

class ShallowCard extends Component {
  state = {
    id: this.props.id,
    title: this.props.title,
    cards: this.props.cards,
    quizzSetting: false
  };
  handleStartEdit = () => {
    this.props.dispatch(startEdit(this.state.id));
    this.props.edit();
  };

  //================================================
  handlestartQuizzSetup = () => {
    this.setState(() => ({ quizzSetting: true }));
  };
  handleEndQuizzSetup = () => {
    this.setState(() => ({ quizzSetting: false }));
  };
  //================================================


  handleRemoveGroup = () => {
    this.props.dispatch(removeGroup(this.state.id));
  };

  handleViewGroup = () => {
    this.props.view();
    this.props.dispatch(setCurrentGroup(this.state.id));
  };

  render() {
    return (
      <div>
        <h2>{this.state.title}</h2>
        <p>Number of cards in this group: {this.state.cards.length}</p>
        <button onClick={this.handleStartEdit}>Edit</button>
        <button onClick={this.handleRemoveGroup}>remove</button>
        <button onClick={this.handleViewGroup}>View</button>
        <button onClick={this.handlestartQuizzSetup}>start</button>
        {this.state.quizzSetting &&
        <QuizzSettings
          end={this.handleEndQuizzSetup}
          id={this.state.id}
          redirect={this.props.redirect}
          cards={this.props.cards}
        />
        }
      </div>
    );

  }
}

export default connect()(ShallowCard);