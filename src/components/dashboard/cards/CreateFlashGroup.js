import React, { Component } from "react";
import { connect } from "react-redux";
import groupSelector from "../../../selectors/groupSelector";
import { cancelEdit, clearCurrentGroup } from "../../../actions/currentGroup";
import { cancelGroupCreation, saveGroup, startSaveGroup, updateGroup } from "../../../actions/cardGroups";
import Cards from "./cardCreation/Cards";
import { clearCurrentCards } from "../../../actions/cards";

class CreateFlashGroup extends Component {
  state = {
    title: "",
    id: "",
    edit: false
  };

  componentWillUnmount() {
    this.props.dispatch(clearCurrentCards());
  };


  handleCancel = () => {
    if (this.props.edit) {
      this.props.dispatch(cancelEdit());
    } else {
      this.props.dispatch(cancelGroupCreation(this.props.group.id));
      this.props.dispatch(clearCurrentGroup());
    }

    this.props.backHome();
  };
  handleSave = () => {
    const { title, _id } = this.props.group;
    const cards = this.props.currentCards;
    if (this.props.edit) {
      // this.props.dispatch(updateGroup(_id, { title, cards }))
      this.props.dispatch(startSaveGroup( // save group to database
        _id,
        this.props.token, { title, cards },
        this.props.groups)
      );
    } else {
      this.props.dispatch(startSaveGroup(// save group to database
        _id,
        this.props.token, { title, cards })
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
    this.setState(() => ({ edit: false }));
    this.props.dispatch(updateGroup(_id, { title, cards }))
  };

  //===============================================


  render() {
    return (
      <div>
        <button onClick={this.handleCancel}>Cancel</button>
        <button onClick={this.handleSave}>save</button>
        {
          this.state.edit ?
            <input
              autoFocus={true}
              style={{ display: "block" }}
              type="text"
              value={this.state.title}
              onChange={this.handleTitleChange}
              onBlur={this.endTitleEdit}
            /> :
            <div>
              <h2>{this.props.group.title}</h2>
              <button onClick={this.startTitleEdit}>Edit</button>
            </div>
        }
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
    token: state.auth.token
  }
};
export default connect(mapStateToProps)(CreateFlashGroup);