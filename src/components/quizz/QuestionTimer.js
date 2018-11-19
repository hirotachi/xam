import React, { Component } from "react";
import { connect } from "react-redux";

class QuestionTimer extends Component {
  state = {
    time: this.props.quizzSettings.timer.time / 1000,
    clock: ""
  };

  componentDidMount(){
    this.setState(() => ({
      clock : setInterval(() => {
        if(this.state.time === 0){
          clearInterval(this.state.clock)
        }else {
          this.setState(() => ({time : this.state.time - 1}));
        }
      }, 1000)
    }))
  };

  componentWillUnmount(){
    clearTimeout();
    clearInterval(this.state.clock);
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
    quizzSettings: state.quizzSettings
  }
};
export default connect(mapStateToProps)(QuestionTimer);