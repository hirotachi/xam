import React, {Component} from "react";
import { connect } from "react-redux";
import groupSelector from "../../../../selectors/groupSelector";
import Card from "./Card";
import { addCard, setCards } from "../../../../actions/cards";


class Cards extends Component {
  state = {
    question: "Add question",
  };

  componentWillMount(){
    this.props.dispatch(setCards(this.props.cards));
  };

  handleAddCard = () => {
    const { question } = this.state;
    this.props.dispatch(addCard(question));
  };
  render() {
    return (
      <div>
        <button onClick={this.handleAddCard}>add</button>
        {this.props.currentCards.map((card, index) =>
          <Card
            key={card.id}
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