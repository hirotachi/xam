import React, { Component } from "react";
import { connect } from "react-redux";
import groupSelector from "../../../selectors/groupSelector";

class ViewGroup extends Component{

  handleBack = () => {
    this.props.back()
  };
  render() {
    return (
      <div>
        this page to view
        <h2>{this.props.group.title}</h2>
        <button onClick={this.handleBack}>Back</button>
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