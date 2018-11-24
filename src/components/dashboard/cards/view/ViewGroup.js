import React, { Component } from "react";
import { connect } from "react-redux";
import groupSelector from "../../../../selectors/groupSelector";
import { clearCurrentGroup, startEdit, setCurrentGroup } from "../../../../actions/currentGroup";
import ViewCard from "./ViewCard";
import { startEditControls } from "../../../../actions/controls";
import { setCards } from "../../../../actions/cards";

class ViewGroup extends Component {

  handleBack = () => {
    this.props.dispatch(clearCurrentGroup());
    this.props.back();
  };

  handleEditGroup = () => {
    this.props.dispatch(startEdit(this.props.group._id));
    this.props.dispatch(startEditControls());
    this.props.edit();
  };
  handleStartQuizz = () => {
    this.props.dispatch(setCurrentGroup(this.props.group._id));
    this.props.dispatch(setCards(this.props.group.cards));
    this.props.redirect("/quizz");
  };
  render() {
    return (
      <div>
        this page to view
        <h2>{this.props.group.title}</h2>
        <button onClick={this.handleBack}>Back</button>
        <button onClick={this.handleEditGroup}>Edit</button>
        <button onClick={this.handleStartQuizz}>Start</button>
        <div>
          {this.props.group.cards.length === 0 ?
            <p>No Cards in this group yet</p> :
            <React.Fragment>
              {this.props.group.cards.map(card => <ViewCard key={card._id} {...card} edit={this.handleEditGroup} />)}
            </React.Fragment>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    group: groupSelector(state.groups, state.currentGroup.currentId)
  }
};
export default connect(mapStateToProps)(ViewGroup);