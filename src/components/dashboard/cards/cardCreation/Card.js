import React, { Component } from "react";
import { connect } from "react-redux";
import { addCard } from "../../../../actions/cards";



class Card extends Component {
  handleAddCard = () => {
    this.props.dispatch(addCard(this.props.id))
  };
  render(){
    return (
      <div>
        <button>add Card</button>
      </div>
    );
  }
}

export default connect()(Card);