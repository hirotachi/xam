import React, { Component } from "react";
import { connect } from "react-redux";
import { setCurrentGroup, startEdit } from "../../../actions/currentGroup";
import { removeGroup } from "../../../actions/cards";

class ShallowCard extends Component{
  state = {
    id: this.props.id,
    title: this.props.title,
    cards: this.props.cards
  };
  handleStartEdit = () => {
    this.props.dispatch(startEdit(this.state.id));
    this.props.edit();
  };

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
      </div>
    );

  }
}
export default connect()(ShallowCard);