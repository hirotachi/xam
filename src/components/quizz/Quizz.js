import React, { Component } from "react";
import { connect } from "react-redux";
import groupSelector from "../../selectors/groupSelector";
import { clearCurrentGroup } from "../../actions/currentGroup";
import QuestionCount from "./QuestionCount";
import QuestionTimer from "./QuestionTimer";
import { increaseCountAndPercent } from "../../actions/quizz";


class Quizz extends Component {
  state = {
    cards: this.props.group.cards,
    currentCard: "",
    answer: "",
    skip: true
  };

  //===========================================
  componentDidMount() {
    // if(!this.props.group || !this.props.auth){
    //   this.props.history.push("/dashboard");
    // }
    if ( this.props.quizzSettings.random ) {
      this.randomPicker(this.state.cards)
    } else {
      this.normalPicker(this.state.cards)
    }
  }

  //
  // componentDidUpdate(){
  //   // if(!this.props.group || !this.props.auth){
  //   //   this.props.history.push("/dashboard");
  //   // }
  // }
  //==========================================

  //==========================================
  handleExit = () => {
    this.props.dispatch(clearCurrentGroup());
    this.props.history.push("/dashboard")
  };
  //card picker==========================================
  //Random
  randomPicker = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    const selection = array.slice(randomIndex, randomIndex + 1).shift();
    const newCollection = array.filter(item => item !== selection);
    this.setState(() => ({ cards: newCollection, currentCard: selection, answer: "" }));
  };
  //Normal
  normalPicker = (array) => {
    const selection = array[ 0 ];
    const newCollection = array.filter(item => item !== selection);
    this.setState(() => ({ cards: newCollection, currentCard: selection, answer: "" }));
  };
  //=============================================================
  handlePickNext = () => { // next upon show answer clicked
    this.nextCard();
    this.setState(() => ({ skip: true }));
  };
  handleSkip = () => { // skip to next card
    this.nextCard()
  };

  nextCard = () => { // pass to next card on deck
    if ( this.props.quizzSettings.random ) {
      this.randomPicker(this.state.cards);
      this.props.dispatch(
        increaseCountAndPercent(this.props.count + 1, this.props.percent, this.props.group.cards)
      );
    } else {
      this.normalPicker(this.state.cards);
      this.props.dispatch(
        increaseCountAndPercent(this.props.count + 1, this.props.percent, this.props.group.cards)
      );
    }
  };
  handleShow = () => { // sets answer from card to be shown if there is any
    this.setState(() => ({ answer: this.state.currentCard.answer, skip: false }));
  };

  //=============================================================

  render() {
    return (
      <React.Fragment>
        {
          this.props.group &&
          <div>
            start quizz
            <h2>{this.props.group.title}</h2>
            <button onClick={this.handleExit}>exit</button>
            <QuestionCount cards={this.props.group.cards}/>
            <div>
              <p>question</p>
              {this.state.answer && <p>{this.state.answer}</p>}

            </div>
            {this.props.quizzSettings.timer.enabled && <QuestionTimer/>}
            {this.state.currentCard.withAnswer && <button onClick={this.handleShow}>show answer</button>}
            {this.state.cards.length !== 0 &&
            <div>
              {this.state.skip ?
                <button onClick={this.handleSkip}>Skip</button> :
                <button onClick={this.handlePickNext}>Next</button>}
            </div>
            }
            {this.state.cards.length === 0 && <button onClick={this.handleExit}>done</button>}

          </div>
        }
      </React.Fragment>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    group: groupSelector(state.groups, state.groups[ 0 ].id),
    currentGroup: state.currentGroup,
    auth: state.auth,
    quizzSettings: state.quizzSettings,
    percent: state.quizz.defaultPercent,
    currentPercent: state.quizz.currentPercent,
    count: state.quizz.currentCount
  }
};

export default connect(mapStateToProps)(Quizz);