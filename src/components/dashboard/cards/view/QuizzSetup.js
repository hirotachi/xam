import React, { Component } from "react";
import { connect } from "react-redux";


class QuizzSetup extends Component {
  render() {
    return (
      <div>
        quizz setup on view page
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    settings: state.quizzSettings
  }
};
export default connect(mapStateToProps)(QuizzSetup);