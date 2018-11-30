import React, {Component} from "react";


class QuestionBar extends Component{
  render() {
    return (
      <div style={{backgroundColor: "black",height: "2rem", position: "relative"}}>
        <div style={{position: "absolute", height: "100%", width: `${this.props.percent}%`,
        backgroundColor: "green", transition: "all 1s ease-In-Out"}}/>
      </div>
    );
  }
}

export default QuestionBar;