import React, { Component } from "react";
import { connect } from "react-redux";
import groupSelector from "../../../selectors/groupSelector";
import { cancelEdit, clearCurrentGroup } from "../../../actions/currentGroup";
import {
  cancelGroupCreation,
  saveGroup,
  startCancelGroupCreation,
  startSaveGroup,
  updateGroup
} from "../../../actions/cardGroups";
import Cards from "./cardCreation/Cards";
import { clearCurrentCards } from "../../../actions/cards";
import ColorPicker from "../ColorPicker/ColorPicker";
import {PencilDesktopIcon} from "../../icons/icons";

class CreateFlashGroup extends Component {
  state = {
    title: "",
    id: "",
    edit: false
  };
  componentDidMount() {
    const appBg = document.querySelector(".app-bg");
    appBg.style.background = "#16191c";
    console.log(appBg);
  }

  componentWillUnmount() {
    this.props.dispatch(clearCurrentCards());
    const appBg = document.querySelector(".app-bg");
    appBg.style = "";
  };


  handleCancel = () => {
    if (this.props.edit) {
       this.props.dispatch(cancelEdit());
    } else {
      this.props.dispatch(startCancelGroupCreation(
        this.props.group._id, this.props.token, this.props.groups ));
      this.props.dispatch(clearCurrentGroup());
    }
    this.props.backHome();
  };
  handleSave = () => {
    const { title, _id } = this.props.group;
    const cards = this.props.currentCards;
    const color = this.props.selectedColor;
    if (this.props.edit) {
      this.props.dispatch(startSaveGroup( // save group to database
        _id,
        this.props.token, { title, color, cards },
        this.props.groups)
      );
    } else {
      this.props.dispatch(startSaveGroup(// save group to database
        _id,
        this.props.token, { title, color, cards })
      );
    }

    this.props.dispatch(clearCurrentGroup());
    this.props.backHome();
  };
  // Title ===============================================
  handleTitleChange = (e) => {
    const title = e.target.value;
    this.setState(() => ({ title }))
  };

  startTitleEdit = () => {
    this.setState(() => ({ edit: true, title: this.props.group.title }));
  };
  endTitleEdit = () => {
    const { _id } = this.props.group;
    const { title } = this.state;
    const cards = this.props.currentCards;
    const color = this.props.selectedColor;
    this.setState(() => ({ edit: false }));
    this.props.dispatch(updateGroup(_id, { title, color, cards }))
  };

  //===============================================


  render() {
    return (
      <div className="cardCreation">
        <div className="cardCreation__btns">
          <button className="cardCreation__btns--cancel" onClick={this.handleCancel}>Cancel</button>
          <button className="cardCreation__btns--save" onClick={this.handleSave}>save</button>
        </div>

        {
          this.state.edit ?
            <input
              className="cardCreation__title--input"
              autoFocus={true}
              style={{ display: "block" }}
              type="text"
              value={this.state.title}
              onChange={this.handleTitleChange}
              onBlur={this.endTitleEdit}
            /> :
            <div className="cardCreation__title">
              <h2 className="cardCreation__title--text">{this.props.group.title}</h2>
              <span className="cardCreation__title--edit" onClick={this.startTitleEdit}>
                <PencilDesktopIcon style="cardCreation__title--edit-icon"/>
              </span>
            </div>
        }

        <ColorPicker _id={this.props.group._id} savedColor={this.props.group.color}/>
        <Cards id={this.props.group._id} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    groups: state.groups,
    group: groupSelector(state.groups, state.currentGroup.currentId),
    currentCards: state.currentCards,
    edit: state.currentGroup.edit,
    currentGroup: state.currentGroup,
    selectedColor: state.colors.selectedColor,
    token: state.auth.token
  }
};
export default connect(mapStateToProps)(CreateFlashGroup);