import React, {Component} from "react";
import Responsive from "../../../../Responsive/Responsive";
import {DropDownIcon, PencilDesktopIcon, PencilMobileIcon} from "../../../icons/icons";

class ViewCard extends Component {
  state = {
    showAnswer: false
  };


  handleShowAnswer = () => {
    //flip answer icon when clicked
    const showAnswerIcon = document.getElementsByClassName(`${this.props._id}-icon`)[0];
    const answer = document.getElementsByClassName(`${this.props._id}-answer`)[0];
    if(!!this.props.answer && !this.state.showAnswer && showAnswerIcon){
      showAnswerIcon.style.transform  = "rotate(180deg)";
      answer.style.minHeight = "10rem";
      const showAnswer = setTimeout(() => {
        this.setState(() => ({showAnswer: !this.state.showAnswer}));
        clearTimeout(showAnswer);
      },500);
    }else if (this.state.showAnswer){
      answer.style.minHeight = "0";
      showAnswerIcon.style.transform  = "rotate(0deg)";
      this.setState(() => ({showAnswer: !this.state.showAnswer}));
    }
  };


  render() {
    return (
      <React.Fragment>
        <div className={`viewCard ${this.props._id}`} style={{backgroundColor: this.props.color}}>
          <React.Fragment>
            <Responsive query={{maxWidth: 480}}>
            <span className="viewCard__edit" onClick={this.props.edit}>
              <PencilMobileIcon style="viewCard__edit--icon"/>
            </span>
            </Responsive>
            <Responsive query={{minWidth: 480}}>
            <span onClick={this.props.edit}>
              <PencilDesktopIcon/>
            </span>
            </Responsive>
          </React.Fragment>
          <h4 className="viewCard__question">{this.props.question}</h4>
        </div>
        <div className={`viewCard__answer--section ${this.props._id}-answer`}
             style={{backgroundColor: `${this.props.color}`}}>
          {this.props.withAnswer &&
          <React.Fragment>
            {this.state.showAnswer &&
            <p className={`viewCard__answer`}
            >{this.props.answer}</p>}
            <span className={`viewCard__answer--show ${this.props._id}-icon`}
                  onClick={this.handleShowAnswer}>
              <DropDownIcon style="viewCard__answer--icon"/>
            </span>
          </React.Fragment>
          }
        </div>
      </React.Fragment>
    );
  }
}

export default ViewCard;