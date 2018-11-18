import React, { Component } from "react";
import { connect } from "react-redux";
import { turnOffRandom, turnOffTimer, turnOnRandom, turnOnTimer } from "../../actions/quizzSettings";


class QuizzSettings extends Component {
    state = {
      random: this.props.settings.random,
      timerEnabled: this.props.settings.timer.enabled,
      time: this.props.settings.timer.time
    };

  handleCancelQuizz = () => {
    this.props.end();
  };

  // Random Setting===============================================
  handleRandomChange = (e) => {
    const random = e.target.checked;
    this.setState(() => ({random}));
    if(random){
      this.props.dispatch(turnOnRandom());
    }else {
      this.props.dispatch(turnOffRandom());
    }
  };
  //Timer Setting===============================================
handleTimerEnabledChange = (e) => {
  const timerEnabled = e.target.checked;
  this.setState(() => ({timerEnabled}));
  if(timerEnabled){
    this.props.dispatch(turnOnTimer());
  }else {
    this.props.dispatch(turnOffTimer());
  }
};
  //============================================================

  render() {
    return (
      <div>
        <p>quizz settings</p>
        <label htmlFor="random">
          Random
          <input
            id="random"
            type="checkbox"
            value={this.state.random}
            onChange={this.handleRandomChange}/>
        </label>
        <label htmlFor="timer">
          Timer
          <input
            type="checkbox"
            id="timer"
            value={this.state.timerEnabled}
            onChange={this.handleTimerEnabledChange}
          />
        </label>
        <button onClick={this.handleCancelQuizz}>cancel</button>
        <button>start</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    settings: state.quizzSettings
  }
};
export default connect(mapStateToProps)(QuizzSettings);
