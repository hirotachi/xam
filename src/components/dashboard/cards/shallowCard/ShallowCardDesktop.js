import React, {Component} from "react";
import {connect} from "react-redux";
import QuizzSettings from "../../quizzSetup/QuizzSettings";

class ShallowCardDesktop extends Component{
  state = {
    quizzSettings: false
  };

  preQuizzSettings = () => {
    this.setState(() => ({quizzSettings: !this.state.quizzSettings}));
  };

  render(){
    return (
      <div style={{backgroundColor: this.props.color}}>
        <span></span>
        <span></span>
        <h2>{this.props.title}</h2>
        <div>
          span
        </div>
          <button onClick={this.preQuizzSettings}>Start</button>
        {this.state.quizzSettings &&
        <QuizzSettings
          layout="desktop"
          end={this.preQuizzSettings}
          cards={this.props.cards}
          id={this.props._id}
          redirect={this.props.redirect}
        />
        }
      </div>
    );
  }
}

export default connect()(ShallowCardDesktop);