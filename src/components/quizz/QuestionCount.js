import React, { Component } from "react";
import { connect } from "react-redux";
import { increaseCountAndPercent, resetCount, startSetStartPercent } from "../../actions/quizz";
import QuestionBar from "./QuestionBar";

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
        <QuestionBar percent={this.props.currentPercent}/>
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