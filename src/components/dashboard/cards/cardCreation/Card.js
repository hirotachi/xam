import React, {Component} from "react";
import {connect} from "react-redux";
import {addCard} from "../../../../actions/cardGroups";
import {removeCard, updateCard} from "../../../../actions/cards";
import shortid from "shortid";


class Card extends Component {
  state = {
    question: this.props.question || "Add question",
    answer: this.props.answer || "add your answer",
    withAnswer: this.props.withAnswer,
    edit: false,
    editAnswer: false,
    id: shortid()
  };

  //=======================================
  handleQuestionChange = (e) => {
    const question = e.target.value;
    this.setState(() => ({question}));
  };
  handleAnswerChange = (e) => {
    const answer = e.target.value;
    if (this.state.withAnswer) {
      this.setState(() => ({answer}))
    } else {
      this.setState(() => ({answer: undefined}))
    }
  };
  //=======================================
  handleQuestionFocus = () => {
    this.setState(() => ({edit: true}));
  };
  handleQuestionBlur = () => {
    const {question, answer} = this.state;
    this.props.dispatch(updateCard(this.props._id, {question, answer}));
    this.setState(() => ({edit: false}));
  };

  handleAnswerBlur = () => {
    const {question, answer, withAnswer} = this.state;
    this.props.dispatch(updateCard((this.props._id || this.props.id), {question, answer, withAnswer}));
    this.setState(() => ({editAnswer: false}));
  };
  handleFocusAnswer = () => {
    this.setState(() => ({editAnswer: true}));
  };

  handleAddAnswer = (e) => {
    const withAnswer = e.target.checked;
    const {answer} = this.state;
    this.setState(() => ({editAnswer: true, withAnswer}));
    this.props.dispatch(updateCard((this.props._id || this.props.id), {answer, withAnswer}));
  };

  //===========================================
  handleAddCard = () => {
    this.props.add();
  };
  handleRemoveCard = () => {
    this.props.dispatch(removeCard(this.props._id || this.props.id));
  };

  render() {
    return (
      <div>
        {this.state.edit ?
          <textarea
            autoFocus={true}
            onBlur={this.handleQuestionBlur}
            value={this.state.question}
            onChange={this.handleQuestionChange}
            placeholder="Question"
          />
          :
          <p onClick={this.handleQuestionFocus}>{this.state.question}</p>
        }
        {this.state.withAnswer &&
        <React.Fragment>
          {this.state.editAnswer ?
            <textarea
              autoFocus={true}
              placeholder="Answer"
              value={this.state.answer}
              onChange={this.handleAnswerChange}
              onBlur={this.handleAnswerBlur}
            /> :
            <p onClick={this.handleFocusAnswer}>{this.state.answer}</p>
          }

        </React.Fragment>

        }
        <label>
          <input
            checked={this.state.withAnswer} id={this.state.id}
            type="checkbox" onChange={this.handleAddAnswer}/>
          with answer
        </label>
        <button onClick={this.handleRemoveCard}>remove</button>
        {this.props.last &&
        <button onClick={this.handleAddCard}>add Card</button>
        }
      </div>
    );
  }
}

export default connect()(Card);