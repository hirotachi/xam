import React, {Component} from "react";
import {connect} from "react-redux";
import QuizzSettings from "../../quizzSetup/QuizzSettings";
import {GearIcon, ShowMoreIcon, TrashIcon} from "../../../icons/icons";

class ShallowCardDesktop extends Component {
  state = {
    quizzSettings: false,
    showOptions: false
  };

  preQuizzSettings = () => {
    this.setState(() => ({quizzSettings: !this.state.quizzSettings}));
  };
  toggleShowOption = () => {
    if(this.state.showOptions){
      //slide options on shallow card up and down
      const editBtn = document.getElementsByClassName(`${this.props._id}-edit`)[0];
      const removeBtn = document.getElementsByClassName(`${this.props._id}-remove`)[0];
      const startBtn = document.getElementsByClassName(`${this.props._id}-start`)[0];
      editBtn.classList.remove("slide_down-in");
      editBtn.classList.add("slide_up-out");

      removeBtn.classList.remove("slide_down-in");
      removeBtn.classList.add("slide_up-out");

      startBtn.classList.remove("slide_up-in");
      startBtn.classList.add("slide_down-out");
      const hideOptions = setTimeout(() => {
        this.setState(() => ({showOptions: !this.state.showOptions}));
        clearTimeout(hideOptions);
      },500)
    }else {
      this.setState(() => ({showOptions: !this.state.showOptions}))
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="shallowCardD" style={{backgroundColor: this.props.color}}>
          <span className="shallowCardD__showMore" onClick={this.toggleShowOption}>
            <ShowMoreIcon style="shallowCardD__showMore--icon"/>
          </span>
          {
            this.state.showOptions && !this.state.quizzSettings &&
            <React.Fragment>
              <span className={`
              shallowCardD__edit
              slide_down-in
              ${this.props._id}-edit`}
                    onClick={this.props.editGroup}>
          <GearIcon style="shallowCardD__edit--icon" fill={this.props.color}/>
              </span>
              <span
                className={`
              shallowCardD__remove
              slide_down-in
              ${this.props._id}-remove`}
                onClick={this.props.removeGroup}>
                <TrashIcon style="shallowCardD__remove--icon" fill={this.props.color}/>
              </span>
              {
                !this.state.quizzSettings &&
                <button
                  className={`shallowCardD__start
                  slide_up-in
                  ${this.props._id}-start
                  `}
                        onClick={this.preQuizzSettings}>Start</button>
              }
            </React.Fragment>
          }
          <p className="shallowCardD__title" onClick={this.props.viewGroup}>{this.props.title}</p>
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
      </React.Fragment>
    );
  }
}

export default connect()(ShallowCardDesktop);