import React, {Component} from "react";
import {connect} from "react-redux";
import Color from "./Color";
import shortId from "shortid";
import {clearSelectedColor, setSelectedColor} from "../../../actions/colors";

class ColorPicker extends Component {
  componentDidMount() {
    if(!this.props.selectedColor && !this.props.savedColor){
      this.props.dispatch(setSelectedColor(this.props.colors.colorsList[0]));
    }else {
      this.props.dispatch(setSelectedColor(this.props.savedColor));
    }
  };
  componentWillUnmount() {
    this.props.dispatch(clearSelectedColor());
  };

  render() {
    return (
      <div>
        colorpicker
        <div style={{
  padding: "1rem", display: "inline-block",
  backgroundColor: this.props.colors.selectedColor
}}/>
        {
          this.props.colors.colorsList.map((color, index) =>
            <Color key={shortId()} index={index} color={color}/>
          )
        }
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    colors: state.colors,
  }
};
export default connect(mapStateToProps)(ColorPicker);