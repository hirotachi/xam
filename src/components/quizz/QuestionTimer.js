import React, { Component } from "react";
import { connect } from "react-redux";
import { resetSettings } from "../../actions/quizzSettings";

class QuestionTimer extends Component {
  state = {
    seconds: this.props.quizzSettings.timer.time.seconds,
    minutes: this.props.quizzSettings.timer.time.minutes,
    clock: ""
  };

  componentDidMount() {
    this.setState(() => ({
      clock: setInterval(() => {
        console.log(`minutes: ${this.state.minutes}, seconds: ${this.state.seconds}`);
        if(this.state.seconds !== 0){
          this.setState(() => ({ seconds: this.state.seconds - 1 }))
        } else if (this.state.seconds === 0 && this.state.minutes !== 0 ){
          this.setState(() => ({ minutes: this.state.minutes - 1, seconds : 59 }));
        }else if ((this.state.seconds === 0 && this.state.minutes === 0)){
          clearInterval(this.state.clock)
        }
      }, 1000)
    }))
  };

  componentWillUnmount() {
    clearTimeout();
    clearInterval(this.state.clock);
    this.props.dispatch(resetSettings())
  }

  render() {
    return (
      <div>
        <p>time : {this.state.time}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    quizzSettings: state.quizzSettings,
    quizz: state.quizz
  }
};
export default connect(mapStateToProps)(QuestionTimer);