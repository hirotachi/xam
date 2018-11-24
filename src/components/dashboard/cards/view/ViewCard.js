import React, { Component } from "react";

class ViewCard extends Component {
  state = {
    showAnswer: false
  };


  handleShowAnswer = () => {
    this.setState(() => ({ showAnswer: !this.state.showAnswer }));
  };


  render() {
    return (
      <div>
        <div>
          <button onClick={this.props.edit}>edit</button>
        </div>
        <h4>{this.props.question}</h4>
        {this.props.withAnswer &&
          <div>
            <label htmlFor={this.props._id}>
              Show answer
            <input
                id={this.props._id}
                type="checkbox"
                value={this.state.showAnswer}
                onChange={this.handleShowAnswer}
              />
            </label>

          </div>
        }
        {this.state.showAnswer && <p>{this.props.answer}</p>}
      </div>
    );
  }
}

export default ViewCard;