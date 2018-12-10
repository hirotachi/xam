import React, {Component} from "react";
import {connect} from "react-redux";
import {addCard} from "../../../../actions/cardGroups";
import {removeCard, updateCard} from "../../../../actions/cards";
import shortid from "shortid";
import {CloseIcon, DropDownIcon, Test} from "../../../icons/icons";
import Responsive from "../../../../Responsive/Responsive";


class Card extends Component {
  state = {
    question: this.props.question || "Add question",
    answer: this.props.answer || "add your answer",
    withAnswer: this.props.withAnswer,
    edit: false,
    editAnswer: false,
    id: shortid(),
    showAnswerSection: false
  };

  componentWillUnmount() {
    clearTimeout(this.hideAnswerCreation);
    clearTimeout(this.showAnswerSection);
  }

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
    this.props.dispatch(updateCard((this.props._id || this.props.id), {question, answer}));
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
    if(!this.props._id){
      this.props.dispatch(removeCard(this.props.id));
    }else {
      this.props.dispatch(removeCard(this.props._id));
    }
  };
  //===========================================
  toggleShowAnswerSection = () => {
    const answerSection = document.getElementsByClassName(this.state.id)[0];
    const answerSectionIcon = document.getElementsByClassName(`${this.state.id}-icon`)[0];
    if(answerSection && !this.state.showAnswerSection){
      answerSection.style.height = "10rem";
      answerSectionIcon.style.transform = "rotate(180deg)";
      this.showAnswerSection = setTimeout(() => {
        this.setState(() => ({showAnswerSection: !this.state.showAnswerSection}));
      }, 500);
    }else {
      answerSection.style.height = "0";
      answerSectionIcon.style.transform = "rotate(0deg)";
        this.setState(() => ({showAnswerSection: !this.state.showAnswerSection}));
    }
  };
  //===========================================

  render() {
    return (
      <div className="cardCreation__container">
        <div className="cardCreation__card" style={{backgroundColor: this.props.selectedColor}}>
          {this.state.edit ?
            <textarea
              className="cardCreation__card--question-input"
              autoFocus={true}
              onBlur={this.handleQuestionBlur}
              value={this.state.question}
              onChange={this.handleQuestionChange}
              placeholder="Question"
            />
            :
            <p className="cardCreation__card--question-text"
               onClick={this.handleQuestionFocus}>{this.state.question}</p>
          }
          <div className="cardCreation__card--answer-toggle">
            <p className="cardCreation__card--answer-text">answer</p>
            <label htmlFor={`${this.state.id}`} className={`switch`}>
              <input
                checked={this.state.withAnswer} id={this.state.id}
                type="checkbox" onChange={this.handleAddAnswer}/>
              <span className={`slider`}/>
            </label>
          </div>


          <span className="cardCreation__card--remove" onClick={this.handleRemoveCard}>
          <CloseIcon style="cardCreation__card--remove-icon"/>
        </span>
        </div>
        <React.Fragment>
          {this.state.withAnswer &&
          <div style={{backgroundColor: this.props.selectedColor}}
            className={`cardCreation__card--section ${this.state.id}`}>
            <span className={`cardCreation__card--section-showMore ${this.state.id}-icon`}
                  onClick={this.toggleShowAnswerSection}>
              <DropDownIcon style="cardCreation__card--section-showMore-icon"/>
            </span>
            {
              this.state.showAnswerSection &&
              <div className="cardCreation__card--section-answer">
                {this.state.editAnswer ?
                  <textarea
                    className="cardCreation__card--section-answer-input"
                    autoFocus={true}
                    placeholder="Answer"
                    value={this.state.answer}
                    onChange={this.handleAnswerChange}
                    onBlur={this.handleAnswerBlur}
                  /> :
                  <div className="cardCreation__card--section-answer-text"
                     onClick={this.handleFocusAnswer}>
                    {this.state.answer}
                  </div>
                }
              </div>
            }
          </div>
          }
        </React.Fragment>
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedColor: state.colors.selectedColor
  }
};

export default connect(mapStateToProps)(Card);