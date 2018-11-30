import React, {Component} from "react";
import {connect} from "react-redux";
import groupSelector from "../../../../selectors/groupSelector";
import {clearCurrentGroup, startEdit} from "../../../../actions/currentGroup";
import ViewCard from "./ViewCard";
import {endViewControls, startEditControls} from "../../../../actions/controls";
import QuizzSettings from "../../quizzSetup/QuizzSettings";
import {GearIcon, LeftArrowIcon, PlayIcon, ShowMoreIcon} from "../../../icons/icons";
import Responsive from "../../../../Responsive/Responsive";

class ViewGroup extends Component {
  state = {
    quizzSetup: false,
    showGroupMenu: false
  };

  handleBack = () => {
    this.props.dispatch(clearCurrentGroup());
    this.props.dispatch(endViewControls());
    this.props.back();
  };

  handleEditGroup = () => {
    this.props.dispatch(startEdit(this.props.group._id));
    this.props.dispatch(startEditControls());
    this.props.dispatch(endViewControls());
    this.props.edit();
  };
  handleStartQuizzSetup = () => {
    this.setState(() => ({quizzSetup: true}));
  };
  handleCancelQuizzSetup = () => {
    this.setState(() => ({quizzSetup: false}));
  };

  // ====================================
  toggleGroupMenu = () => {
    this.setState(() => ({showGroupMenu: !this.state.showGroupMenu}))
  };

  // ====================================


  render() {
    return (
      <div>
        <h2>{this.props.group.title}</h2>
        <button onClick={this.handleBack}><LeftArrowIcon/></button>
        <Responsive query={{maxWidth: 480}}>
          {
            !this.state.quizzSetup &&
            <React.Fragment>
              <button onClick={this.handleEditGroup}><GearIcon/></button>
              <button onClick={this.handleStartQuizzSetup}>Start</button>
            </React.Fragment>
          }
        </Responsive>
        <Responsive query={{minWidth: 480}}>
          {
            this.state.showGroupMenu ?
              <div>
                {
                  !this.state.quizzSetup &&
                  <span onClick={this.handleStartQuizzSetup}>
                  <PlayIcon/>
                </span>
                }

                <span onClick={this.handleEditGroup}>
                  <GearIcon/>
                </span>
                <span onClick={this.toggleGroupMenu}>
                  <LeftArrowIcon/>
                </span>
              </div> :
              <span onClick={this.toggleGroupMenu}>
                <ShowMoreIcon/>
              </span>
          }
        </Responsive>
        {
          this.state.quizzSetup &&
          <QuizzSettings
            layout="mobile-viewGroup"
            end={this.handleCancelQuizzSetup}
            id={this.props.group._id}
            redirect={this.props.redirect}
            cards={this.props.group.cards}
          />
        }
        <div>
          {this.props.group.cards.length === 0 ?
            <p>No Cards in this group yet</p> :
            <React.Fragment>
              {this.props.group.cards.map(card =>
                <ViewCard color={this.props.group.color} key={card._id} {...card} edit={this.handleEditGroup}/>)}
            </React.Fragment>
          }
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    group: groupSelector(state.groups, state.currentGroup.currentId),
  }
};
export default connect(mapStateToProps)(ViewGroup);