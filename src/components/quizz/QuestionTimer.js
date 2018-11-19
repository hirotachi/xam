import React, { Component } from "react";
import { connect } from "react-redux";

class QuestionTimer extends Component {
  state = {
    time: this.props.quizzSettings.timer.time / 1000
  };

  componentDidMount(){
    const clock =  setInterval(() => {
      if(this.state.time === 0){
          clearInterval(clock)
      }else {
        this.setState(() => ({time : this.state.time - 1}));
      }
    }, 1000);
  };

  componentWillUnmount(){
    clearTimeout();
  }

  render() {
    return (
      <div>
        timer
        time : {this.state.time}
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