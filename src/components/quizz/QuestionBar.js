import React, {Component} from "react";


class QuestionBar extends Component{
  render() {
    return (
      <div className="quizz__count--bar-outter">
        <div className="quizz__count--bar-inner"
             style={{width: `${this.props.percent}%`}}/>
      </div>
    );
  }
}

export default QuestionBar;