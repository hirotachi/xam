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
    this.setState(() => ({showAnswerSection: !this.state.showAnswerSection}))
  };
  //===========================================

  render() {
    return (
      <div style={{backgroundColor: this.props.selectedColor}}>
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
        <label>
          <input
            checked={this.state.withAnswer} id={this.state.id}
            type="checkbox" onChange={this.handleAddAnswer}/>
          with answer
        </label>
        <React.Fragment>
          {this.state.withAnswer &&
          <div>
            <span onClick={this.toggleShowAnswerSection}><DropDownIcon/></span>
            {
              this.state.showAnswerSection &&
                <div>
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
                </div>
            }
          </div>
          }
        </React.Fragment>

        <span onClick={this.handleRemoveCard}><CloseIcon/></span>
        {this.props.last &&
        <Responsive query={{minWidth: 480}}>
          <button onClick={this.handleAddCard}>add Card</button>
        </Responsive>
        }
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