import React, {Component} from "react";
import {connect} from "react-redux";
import {setSelectedColor} from "../../../actions/colors";

class Color extends Component{
  handleSelectColor = () => {
    this.props.dispatch(setSelectedColor(this.props.color))
  };
  render() {
    return (
      <div onClick={this.handleSelectColor}
        style={{padding: "1rem", backgroundColor: this.props.color, display: "inline-block",
        borderRadius: "50%"}}>
      </div>
    );
  }
}

export default connect()(Color);