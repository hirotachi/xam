import React, { Component } from "react";
import { connect } from "react-redux";
import groupSelector from "../../selectors/groupSelector";
import { clearCurrentGroup } from "../../actions/currentGroup";


class Quizz extends Component{

  //===========================================
  componentDidMount(){
    if(!this.props.group || !this.props.auth){
      this.props.history.push("/dashboard");
    }
  }

  componentDidUpdate(){
    if(!this.props.group || !this.props.auth){
      this.props.history.push("/dashboard");
    }
  }
  //==========================================

  handleExit = () => {
    this.props.dispatch(clearCurrentGroup());
    this.props.history.push("/dashboard")
  };
  render(){
    return (
      <React.Fragment>
        {
          this.props.group &&
          <div>
            start quizz
            <h2>{this.props.group.title}</h2>
            <button onClick={this.handleExit}>exit</button>
          </div>
        }
      </React.Fragment>

    );
  }
}
const mapStateToProps = (state) => {
  return {
    group: groupSelector(state.groups, state.currentGroup.currentId),
    currentGroup: state.currentGroup,
    auth: state.auth
  }
};
export default connect(mapStateToProps)(Quizz);