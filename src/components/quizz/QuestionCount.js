import React, { Component } from "react";
import { connect } from "react-redux";
import { increaseCountAndPercent, resetCount, startSetStartPercent } from "../../actions/quizz";

class QuestionCount extends Component {

  //============================================================
  componentDidMount() {
    const percent = Math.floor(100 / this.props.cards.length);
    this.props.dispatch(startSetStartPercent(percent));
  };

  componentWillUnmount() {
    this.props.dispatch(resetCount())
  }

  //============================================================


  handleIncreasePercent = () => {
    this.props.dispatch(increaseCountAndPercent(this.props.percent, this.props.count + 1));
  };

  render() {
    return (
      <div>
        Questions count is : {`${this.props.count}/${this.props.cards.length}`}
        <button onClick={this.handleIncreasePercent}>Up</button>
        <p>{this.props.currentPercent} </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    percent: state.quizz.defaultPercent,
    currentPercent: state.quizz.currentPercent,
    count: state.quizz.currentCount
  }
};
export default connect(mapStateToProps)(QuestionCount);