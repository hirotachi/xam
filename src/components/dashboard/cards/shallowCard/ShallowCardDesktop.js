import React, {Component} from "react";
import {connect} from "react-redux";
import QuizzSettings from "../../quizzSetup/QuizzSettings";
import {GearIcon, TrashIcon} from "../../../icons/icons";

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
        <span onClick={this.props.editGroup} style={{backgroundColor: "grey"}}>
          <GearIcon fill={this.props.color}/>
        </span>
        <span onClick={this.props.removeGroup} style={{backgroundColor: "grey"}}>
          <TrashIcon fill={this.props.color}/>
        </span>
        <h2 onClick={this.props.viewGroup}>{this.props.title}</h2>
        <div>
          span
        </div>
          <button onClick={this.preQuizzSettings}>Start</button>
        {this.state.quizzSettings &&
        <QuizzSettings
          layout="desktop-dashboard"
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