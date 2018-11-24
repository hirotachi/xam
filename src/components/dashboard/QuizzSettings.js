import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  resetSettings,
  turnOffRandom,
  turnOffTimer,
  turnOnRandom,
  turnOnTimer,
  startSetTimer
} from "../../actions/quizzSettings";
import { setCurrentGroup } from "../../actions/currentGroup";
import { setCards } from "../../actions/cards";


class QuizzSettings extends Component {
  state = {
    random: this.props.settings.random,
    timerEnabled: this.props.settings.timer.enabled,
    time: this.props.settings.timer.time.seconds,
    timeMetrics: "seconds"
  };

  handleCancelQuizz = () => {
    this.props.dispatch(resetSettings());
    this.props.end();
  };

  // Random Setting===============================================
  handleRandomChange = (e) => {
    const random = e.target.checked;
    this.setState(() => ({ random }));
    if (random) {
      this.props.dispatch(turnOnRandom());
    } else {
      this.props.dispatch(turnOffRandom());
    }
  };
  //Timer Setting===============================================
  handleTimerEnabledChange = (e) => {
    const timerEnabled = e.target.checked;
    this.setState(() => ({ timerEnabled }));
    if (timerEnabled) {
      this.props.dispatch(turnOnTimer());
    } else {
      this.props.dispatch(turnOffTimer());
    }
  };
  handleChangeTime = (e) => {
    const time = e.target.value.toString();
    if (!time || time.match(/^\d{1,3}?$/g)) {
      this.setState(() => ({ time }));
    }
    if (!isNaN(parseInt(time)) && this.state.timeMetrics === "seconds") {
      this.props.dispatch(startSetTimer({ seconds: parseInt(time) }));
    } else if (!isNaN(parseInt(time)) && this.state.timeMetrics === "minutes") {
      this.props.dispatch(startSetTimer({ minutes: parseInt(time) }));
    } else {
      this.props.dispatch(startSetTimer({ seconds: 10 }));
    }

  };

  handleTimeMetricsChange = (e) => {
    const timeMetrics = e.target.value;
    this.setState(() => ({ timeMetrics }));
    if (timeMetrics === "seconds") {
      this.props.dispatch(startSetTimer({ seconds: parseInt(this.state.time) }));
    } else if (timeMetrics === "minutes") {
      this.props.dispatch(startSetTimer({ minutes: parseInt(this.state.time) }));
    } else {
      this.props.dispatch(startSetTimer({ seconds: 10 }));
    }
  };

  //============================================================
  handleStartQuizz = () => {
    this.props.dispatch(setCurrentGroup(this.props.id));
    this.props.dispatch(setCards(this.props.cards));
    this.props.redirect("/quizz");
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
            onChange={this.handleRandomChange} />
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
        {this.state.timerEnabled &&
          <div>
            <input
              type="number"
              value={this.state.time}
              onChange={this.handleChangeTime}
            />
            <select
              onChange={this.handleTimeMetricsChange}
              defaultValue={this.state.timeMetrics}
              name="timer">
              <option value="seconds">Seconds</option>
              <option value="minutes">Minutes</option>
            </select>
          </div>
        }
        <button onClick={this.handleCancelQuizz}>cancel</button>
        <button onClick={this.handleStartQuizz}>start</button>
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
