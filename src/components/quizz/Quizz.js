import React, { Component } from "react";
import { connect } from "react-redux";
import groupSelector from "../../selectors/groupSelector";
import { clearCurrentGroup } from "../../actions/currentGroup";
import QuestionCount from "./QuestionCount";
import QuestionTimer from "./QuestionTimer";
import { increaseCountAndPercent } from "../../actions/quizz";


class Quizz extends Component {
  state = {
    cards: this.props.group.cards,
    currentCard: ""
  };

  //===========================================
  componentDidMount() {
    // if(!this.props.group || !this.props.auth){
    //   this.props.history.push("/dashboard");
    // }
    if ( this.props.quizzSettings.random ) {
      this.randomPicker(this.state.cards)
    }else {
      this.normalPicker(this.state.cards)
    }
  }

  //
  // componentDidUpdate(){
  //   // if(!this.props.group || !this.props.auth){
  //   //   this.props.history.push("/dashboard");
  //   // }
  // }
  //==========================================
  handleCountUp = () => {
    console.log("count up")
  };
  //==========================================
  handleExit = () => {
    this.props.dispatch(clearCurrentGroup());
    this.props.history.push("/dashboard")
  };
  //card picker==========================================
  //Random
  randomPicker = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    const selection = array.slice(randomIndex, randomIndex + 1).shift();
    const newCollection = array.filter(item => item !== selection);
    this.setState(() => ({ cards: newCollection, currentCard: selection }));
  };
  //Normal
  normalPicker = (array) => {
    const selection = array[0];
    const newCollection = array.filter(item => item !== selection);
    console.log(selection, newCollection);
  };
  //=============================================================
  handlePickNext = () => {
    if ( this.props.quizzSettings.random ) {
      this.randomPicker(this.state.cards);
      this.props.dispatch(
        increaseCountAndPercent(this.props.count + 1,this.props.percent, this.props.group.cards)
      );
    }else {
      this.normalPicker(this.state.cards);
      this.props.dispatch(
        increaseCountAndPercent(this.props.count + 1, this.props.percent, this.props.group.cards)
      );
    }
  };
  //=============================================================

  render() {
    return (
      <React.Fragment>
        {
          this.props.group &&
          <div>
            start quizz
            <h2>{this.props.group.title}</h2>
            <button onClick={this.handleExit}>exit</button>
            <QuestionCount cards={this.props.group.cards}/>
            {this.props.quizzSettings.timer.enabled && <QuestionTimer/>}
            <button onClick={this.handleCountUp}>count Up</button>
            {this.state.currentCard.withAnswer && <button>show answer</button>}
            {this.state.cards.length !== 0 && <button onClick={this.handlePickNext}>next</button>}
            {this.state.cards.length === 0 && <button >done</button>}

          </div>
        }
      </React.Fragment>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    group: groupSelector(state.groups, state.groups[ 0 ].id),
    currentGroup: state.currentGroup,
    auth: state.auth,
    quizzSettings: state.quizzSettings,
    percent: state.quizz.defaultPercent,
    currentPercent: state.quizz.currentPercent,
    count: state.quizz.currentCount
  }
};

export default connect(mapStateToProps)(Quizz);