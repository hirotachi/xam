import React, {Component} from "react";
import {connect} from "react-redux";
import {setSelectedColor} from "../../../actions/colors";

class Color extends Component{
  handleSelectColor = () => {
    this.props.dispatch(setSelectedColor(this.props.color))
  };
  render() {
    return (
      <div className="colorPicker__color" onClick={this.handleSelectColor}
        style={{ backgroundColor: this.props.color}}>
      </div>
    );
  }
}

export default connect()(Color);