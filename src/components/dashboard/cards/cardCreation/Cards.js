import React, {Component} from "react";
import { connect } from "react-redux";
import groupSelector from "../../../../selectors/groupSelector";
import Card from "./Card";
import { addCard, setCards } from "../../../../actions/cards";
import shortid from "shortid";
import {AddIcon} from "../../../icons/icons";


class Cards extends Component {
  state = {
    question: "Add question",
  };

  componentWillMount(){
    this.props.dispatch(setCards(this.props.cards));
  };

  handleAddCard = () => {
    const { question } = this.state;
    this.props.dispatch(addCard(shortid(), question));
  };
  render() {
    return (
      <div className="cardCreation__cards">
        <button className="cardCreation__cards--add" onClick={this.handleAddCard}><AddIcon/></button>
        {this.props.currentCards.map((card, index) =>
          <Card
            key={shortid()}
            {...card}
            add={this.handleAddCard}
            last={index === this.props.currentCards.length - 1} />)
        }
      </div>
    );
  }
}
const mapStateToProps = (state, props) => {
  return {
    cards: groupSelector(state.groups, props.id).cards,
    currentCards: state.currentCards
  }
};
export default connect(mapStateToProps)(Cards);