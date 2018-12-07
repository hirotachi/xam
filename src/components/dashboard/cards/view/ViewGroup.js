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

  componentDidMount() {
    //make place for group title under the nav
    if (screen.width <= 480) {
      const nav = document.querySelector(".nav");
      nav.style.marginBottom = "5rem";
      const appBg = document.querySelector(".app-bg");
      appBg.style.background = `linear-gradient(100deg, ${this.props.group.color} -1.15%, black 93.39%)`;
    }

  }

  componentWillUnmount() {
    const nav = document.querySelector(".nav");
    if (nav) {
      nav.style.marginBottom = "0";
      const appBg = document.querySelector(".app-bg");
      appBg.style = "";
    }
  }

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
    // fix overlap of quizzSettings and last card in viewGroup
    const viewGroup = document.querySelector(".viewGroup");
    viewGroup.style.paddingBottom = "12rem";
  };
  handleCancelQuizzSetup = () => {
    this.setState(() => ({quizzSetup: false}));
    // fix overlap of quizzSettings and last card in viewGroup
    const viewGroup = document.querySelector(".viewGroup");
    viewGroup.style = "";
  };

  // ====================================
  toggleGroupMenu = () => {
    this.setState(() => ({showGroupMenu: !this.state.showGroupMenu}))
  };

  // ====================================


  render() {
    return (
      <div className="viewGroup">
        <h2 className="viewGroup__title slide_down-in">{this.props.group.title}</h2>
        <span className="viewGroup__back slide_right-in" onClick={this.handleBack}>
          <LeftArrowIcon style="viewGroup__back--icon"/>
        </span>
        <Responsive query={{maxWidth: 480}}>
          {
            !this.state.quizzSetup &&
            <React.Fragment>
              <span className="viewGroup__edit slide_up-in" onClick={this.handleEditGroup}>
                <GearIcon style="viewGroup__edit--icon"/>
              </span>
              <button className="viewGroup__start slide_down-in"
                      onClick={this.handleStartQuizzSetup}>Start quizz
              </button>
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
    controls: state.controls
  }
};
export default connect(mapStateToProps)(ViewGroup);