import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setTimer, turnOffRandom, turnOffTimer, turnOnRandom, turnOnTimer } from "../../actions/quizzSettings";
import { setCurrentGroup } from "../../actions/currentGroup";


class QuizzSettings extends Component {
  state = {
    random: this.props.settings.random,
    timerEnabled: this.props.settings.timer.enabled,
    time: this.props.settings.timer.time / 1000,
    timeMetrics: "seconds"
  };

  handleCancelQuizz = () => {
    this.props.end();
  };

  // Random Setting===============================================
  handleRandomChange = (e) => {
    const random = e.target.checked;
    this.setState(() => ({ random }));
    if ( random ) {
      this.props.dispatch(turnOnRandom());
    } else {
      this.props.dispatch(turnOffRandom());
    }
  };
  //Timer Setting===============================================
  handleTimerEnabledChange = (e) => {
    const timerEnabled = e.target.checked;
    this.setState(() => ({ timerEnabled }));
    if ( timerEnabled ) {
      this.props.dispatch(turnOnTimer());
    } else {
      this.props.dispatch(turnOffTimer());
    }
  };
  handleChangeTime = (e) => {
    const time = e.target.value.toString();
    if ( !time || time.match(/[0-9]+$/g) ) {
      this.setState(() => ({ time }));
    }
    if ( !isNaN(parseInt(time)) && this.state.timeMetrics === "seconds" ) {
      this.props.dispatch(setTimer(parseInt(time * 1000)));
    }else if (!isNaN(parseInt(time)) && this.state.timeMetrics === "minutes") {
      this.props.dispatch(setTimer(parseInt(time * 60000)));
    } else {
      this.props.dispatch(setTimer(10000));
    }

  };

  handleTimeMetricsChange = (e) => {
    const timeMetrics = e.target.value;
    this.setState(() => ({ timeMetrics }));
    if(timeMetrics === "seconds"){
      this.props.dispatch(setTimer(parseInt(this.state.time * 1000)));
    }else if (timeMetrics === "minutes") {
      this.props.dispatch(setTimer(parseInt(this.state.time * 60000)));
    } else {
      this.props.dispatch(setTimer(10000));
    }
  };

  //============================================================
  handleStartQuizz = () => {
    this.props.dispatch(setCurrentGroup(this.props.id));
    this.props.redirect("/quizz")
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
