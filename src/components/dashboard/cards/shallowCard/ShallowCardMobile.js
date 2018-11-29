import React, {Component} from "react";
import {connect} from "react-redux";
import {CloseIcon, ShowMoreIcon} from "../../../icons/icons";
import QuizzSettings from "../../quizzSetup/QuizzSettings";
import {startEdit} from "../../../../actions/currentGroup";
import {startEditControls} from "../../../../actions/controls";
import {startRemoveGroup} from "../../../../actions/cardGroups";


class ShallowCardMobile extends Component{
  state = {
    showDetails: false,
    quizzSettings: false
  };
  toggleDetails = () => {
    this.setState(() => ({showDetails: !this.state.showDetails}))
  };

  preQuizzSettings = () => {
    this.setState(() => ({quizzSettings: !this.state.quizzSettings}));
  };

  render() {
    return (
      <div style={{backgroundColor: this.props.color}} >
        <span onClick={this.toggleDetails}><ShowMoreIcon/></span>
        <h2 onClick={this.props.viewGroup}>{this.props.title}</h2>
        {
          this.state.showDetails &&
            <div>
              <p>{this.props.title}</p>
              <div>
                <p>cards: {this.props.cards.length}</p>
              </div>
              <div>
                <span onClick={this.toggleDetails}><CloseIcon/></span>
                <button onClick={this.preQuizzSettings}>Start</button>
                <button onClick={this.props.editGroup}>Edit</button>
                <button onClick={this.props.removeGroup}>Remove</button>
                <button onClick={this.props.viewGroup}>View</button>
              </div>
              {this.state.quizzSettings &&
              <QuizzSettings
                layout="mobile-dashboard"
                end={this.preQuizzSettings}
                cards={this.props.cards}
                id={this.props._id}
                redirect={this.props.redirect}
              />
              }
            </div>
        }
      </div>
    )
  }
}

export default connect()(ShallowCardMobile);