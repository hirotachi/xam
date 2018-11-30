import React, { Component } from "react";
import Responsive from "../../../../Responsive/Responsive";
import {PencilDesktopIcon, PencilMobileIcon} from "../../../icons/icons";

class ViewCard extends Component {
  state = {
    showAnswer: false
  };


  handleShowAnswer = () => {
    this.setState(() => ({ showAnswer: !this.state.showAnswer }));
  };


  render() {
    return (
      <div style={{backgroundColor: this.props.color}}>
        <div>
          <Responsive query={{maxWidth: 480}}>
            <span onClick={this.props.edit}>
              <PencilMobileIcon/>
            </span>
          </Responsive>
          <Responsive query={{minWidth: 480}}>
            <span onClick={this.props.edit}>
              <PencilDesktopIcon/>
            </span>
          </Responsive>
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