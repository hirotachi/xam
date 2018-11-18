import React, { Component } from "react";
import { connect } from "react-redux";
import { addCard } from "../../../../actions/cardGroups";
import { removeCard } from "../../../../actions/cards";



class Card extends Component {
  handleAddCard = () => {
    this.props.add();
  };
  handleRemoveCard = () => {
    this.props.dispatch(removeCard(this.props.id));
  };
  render(){
    return (
      <div>
        card
        <button onClick={this.handleRemoveCard}>remove</button>
        { this.props.last &&
          <button onClick={this.handleAddCard}>add Card</button>
        }
      </div>
    );
  }
}

export default connect()(Card);