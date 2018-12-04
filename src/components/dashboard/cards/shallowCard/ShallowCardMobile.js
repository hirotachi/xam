import React, {Component} from "react";
import {connect} from "react-redux";
import {CloseIcon, ShowMoreIcon} from "../../../icons/icons";
import QuizzSettings from "../../quizzSetup/QuizzSettings";


class ShallowCardMobile extends Component{
  state = {
    showDetails: false,
    quizzSettings: false
  };



  toggleDetails = () => {
    if(this.state.showDetails){
      const cardInfo = document.querySelector(".shallowCardM__info");
      cardInfo.classList.remove("slide_up-in");
      cardInfo.classList.add("slide_down-out");
      const hideInfo = setTimeout(() => {
        this.setState(() => ({showDetails: !this.state.showDetails}));
        clearTimeout(hideInfo);
      },500);
    }else {
      this.setState(() => ({showDetails: !this.state.showDetails}));
    }
  };

  preQuizzSettings = () => {
    this.setState(() => ({quizzSettings: !this.state.quizzSettings}));
  };


  render() {
    return (
      <div style={{backgroundColor: this.props.color}} className="shallowCardM">
        <span onClick={this.toggleDetails}><ShowMoreIcon style="shallowCardM__more"/></span>
        <h2 onClick={this.props.viewGroup}>{this.props.title}</h2>
        {
          this.state.showDetails &&
            <div className="shallowCardM__info slide_up-in">
              <p className="shallowCardM__info--title">{this.props.title}</p>
              <div>
                <p className="shallowCardM__info--count">cards: {this.props.cards.length}</p>
              </div>
              <div className="shallowCardM__info--options">
                <span onClick={this.toggleDetails}><CloseIcon style="shallowCardM__close"/></span>
                <p className="shallowCardM__info--btn" onClick={this.preQuizzSettings}>Start</p>
                <p className="shallowCardM__info--btn" onClick={this.props.editGroup}>Edit</p>
                <p className="shallowCardM__info--btn" onClick={this.props.removeGroup}>Remove</p>
                <p className="shallowCardM__info--btn" onClick={this.props.viewGroup}>View</p>
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