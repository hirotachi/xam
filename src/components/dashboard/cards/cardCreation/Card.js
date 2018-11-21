import React, { Component } from "react";
import { connect } from "react-redux";
import { addCard } from "../../../../actions/cardGroups";
import { removeCard, updateCard } from "../../../../actions/cards";


class Card extends Component {
  state = {
    question: this.props.question || "Add question",
    answer: this.props.answer || "",
    withAnswer: !!this.props.answer,
    edit: false,
    editAnswer: false
  };

  //=======================================
  handleQuestionChange = (e) => {
    const question = e.target.value;
    this.setState(() => ({ question }));
  };
  handleAnswerChange = (e) => {
    const answer = e.target.value;
    if ( this.state.withAnswer ) {
      this.setState(() => ({ answer }))
    } else {
      this.setState(() => ({ answer: undefined }))
    }
  };
  //=======================================
  handleQuestionFocus = () => {
    this.setState(() => ({ edit: true }));
  };
  handleQuestionBlur = () => {
    const { question, answer } = this.state;
    this.props.dispatch(updateCard(this.props.id, { question, answer }));
    this.setState(() => ({ edit: false }));
  };

  handleAnswerBlur = () => {
    const { question, answer } = this.state;
    this.props.dispatch(updateCard(this.props.id, { question, answer }));
    this.setState(() => ({ editAnswer: false }));
  };
  handleFocusAnswer = () => {
    this.setState(() => ({editAnswer: true}));
  };

  handleAddAnswer = (e) => {
    const withAnswer = e.target.checked;
    const { question, answer } = this.state;
    if(withAnswer){
      this.props.dispatch(updateCard(this.props.id, {question, answer, withAnswer}));
      this.setState(() => ({ withAnswer: true, editAnswer: true }));
    }else {
      this.setState(() => ({editAnswer: false, withAnswer: false}));
      this.props.dispatch(updateCard(this.props.id, {question, answer: "", withAnswer}));
    }
  };


  //===========================================
  handleAddCard = () => {
    this.props.add();
  };
  handleRemoveCard = () => {
    this.props.dispatch(removeCard(this.props.id));
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
        <label htmlFor={this.props.id}>
          <input checked={this.state.withAnswer} id={this.props.id} type="checkbox" onChange={this.handleAddAnswer}/>
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