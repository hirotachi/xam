import React, { Component } from "react";
import { connect } from "react-redux";
import groupSelector from "../../../selectors/groupSelector";
import { cancelEdit, clearCurrentGroup } from "../../../actions/currentGroup";
import { cancelGroupCreation, saveGroup, updateGroup } from "../../../actions/cards";
import Cards from "./cardCreation/Cards";

class CreateFlashGroup extends Component {
  state = {
    title: this.props.group.title,
    id: this.props.group.id,
    edit: false
  };


  handleCancel = () => {
    if(this.props.edit){
      this.props.dispatch(cancelEdit());
    }else {
      this.props.dispatch(cancelGroupCreation(this.state.id));
      this.props.dispatch(clearCurrentGroup());
    }

    this.props.backHome();
  };
  handleSave = () => {
    const {title, id} = this.state;
    if(this.props.edit){
      this.props.dispatch(updateGroup(id, {title}))
    }else {
      this.props.dispatch(saveGroup(id, {title}));
    }
    this.props.dispatch(clearCurrentGroup());
    this.props.backHome();
  };
  // Title ===============================================
  handleTitleChange = (e) => {
    const title = e.target.value;
    this.setState(() => ({ title }));
  };

  startTitleEdit = () => {
    this.setState(() => ({ edit: true }));
  };
  endTitleEdit = () => {
    this.setState(() => ({ edit: false }));
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
              style={{display: "block"}}
              type="text"
              value={this.state.title}
              onChange={this.handleTitleChange}
              onBlur={this.endTitleEdit}
            /> :
            <div>
              <h2>{this.state.title}</h2>
              <button onClick={this.startTitleEdit}>Edit</button>
            </div>
        }
        <Cards/>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    group: groupSelector(state.groups, state.currentGroup.currentId),
    edit: state.currentGroup.edit
  }
};
export default connect(mapStateToProps)(CreateFlashGroup);