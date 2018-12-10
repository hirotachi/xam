import React, { Component } from "react";
import { connect } from "react-redux";
import groupSelector from "../../selectors/groupSelector";
import { clearCurrentGroup } from "../../actions/currentGroup";
import QuestionCount from "./QuestionCount";
import QuestionTimer from "./QuestionTimer";
import { increaseCountAndPercent } from "../../actions/quizz";
import {resetSettings} from "../../actions/quizzSettings";
import {resetControls} from "../../actions/controls";


class Quizz extends Component {
  state = {
    cards: this.props.groups.length > 0 && this.props.group.cards,
    currentCard: "",
    answer: "",
    skip: true
  };

  //===========================================
  componentWillMount() {
    if (!this.props.currentGroup.currentId || !this.props.auth) {
      this.props.history.push("/dashboard");
    }else {
      if (this.props.quizzSettings.random) {
        this.randomPicker(this.state.cards)
      } else {
        this.normalPicker(this.state.cards)
      }
    }
  };
  componentDidUpdate() {
    if (!this.props.currentGroup.currentId || !this.props.auth) {
      this.props.history.push("/dashboard");
    }
  };

  componentWillUnmount() {
    this.props.dispatch(resetSettings());
    this.props.dispatch(resetControls());
  }

  //==========================================

  //==========================================
  handleExit = () => {
    this.props.dispatch(clearCurrentGroup());
    this.props.history.push("/dashboard")
  };
  //card picker==========================================
  //Random
  randomPicker = (array) => {
    if (!!this.props.currentGroup.currentId) {
      const randomIndex = Math.floor(Math.random() * array.length);
      const selection = array.slice(randomIndex, randomIndex + 1).shift();
      const newCollection = array.filter(item => item !== selection);
      this.setState(() => ({ cards: newCollection, currentCard: selection, answer: "" }));
    }
  };
  //Normal
  normalPicker = (array) => {
    const selection = array[0];
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
    if (this.props.quizzSettings.random) {
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
      <div className="quizz">
        <div className="quizz__nav">
          <p className="quizz__logo">XAM</p>
          <span className="quizz__exit" onClick={this.handleExit}>exit</span>
        </div>

        {
          this.props.group && this.props.groups.length > 0 &&
          <div className="quizz__group">
            <h2 className="quizz__group--title">{this.props.group.title}</h2>
            <div className="quizz__extras">
              <QuestionCount cards={this.props.group.cards} />
              {this.props.quizzSettings.timer.enabled && <QuestionTimer />}
            </div>

            <div className="quizz__section">
              <p className="quizz__section--question">
                {!!this.state.currentCard && this.state.currentCard.question}
                </p>
              {
                this.state.answer &&
              <p className="quizz__section--answer">{this.state.answer}</p>
              }

            </div>
            <div className="quizz__controls">
              {this.state.currentCard.withAnswer && !this.state.answer
              && <span className="quizz__controls--btn quizz__controls--btn-showAnswer"
                       onClick={this.handleShow}>show answer</span>}
              {this.state.cards.length !== 0 &&
              <React.Fragment>
                {this.state.skip && this.state.currentCard.withAnswer ?
                  <span className="quizz__controls--btn quizz__controls--btn-skip"
                        onClick={this.handleSkip}>Skip</span> :
                  <span className="quizz__controls--btn quizz__controls--btn-next"
                        onClick={this.handlePickNext}>Next</span>}
              </React.Fragment>
              }
              {this.state.cards.length === 0 &&
              <span className="quizz__controls--btn quizz__controls--btn-done"
                    onClick={this.handleExit}>done</span>
              }
            </div>
          </div>
        }
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    groups: state.groups,
    group: groupSelector(state.groups, state.currentGroup.currentId || state.groups[0]),
    currentGroup: state.currentGroup,
    currentCards: state.currentCards,
    auth: state.auth,
    quizzSettings: state.quizzSettings,
    percent: state.quizz.defaultPercent,
    currentPercent: state.quizz.currentPercent,
    count: state.quizz.currentCount
  }
};

export default connect(mapStateToProps)(Quizz);