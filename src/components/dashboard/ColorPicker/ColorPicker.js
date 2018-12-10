import React, {Component} from "react";
import {connect} from "react-redux";
import Color from "./Color";
import shortId from "shortid";
import {clearSelectedColor, setSelectedColor} from "../../../actions/colors";
import {updateGroup} from "../../../actions/cardGroups";

class ColorPicker extends Component {
  state = {
    show: false
  };

  componentDidMount() {
    if (!this.props.selectedColor && !this.props.savedColor) {
      this.props.dispatch(updateGroup(this.props._id, {color: this.props.colors.colorsList[0]}));
      this.props.dispatch(setSelectedColor(this.props.colors.colorsList[0]));
    } else {
      this.props.dispatch(setSelectedColor(this.props.savedColor));
    }
  };

  componentWillUnmount() {
    this.props.dispatch(clearSelectedColor());
  };

  toggleColorList = () => {
    //restyle color pickers main button
    const colorPickerBtn = document.querySelector(".colorPicker");
    if(!this.state.show){
      colorPickerBtn.style.borderRadius = "0";
    }else {
      colorPickerBtn.style.borderRadius = "50%";
    }
    this.setState(() => ({show: !this.state.show}))
  };

  render() {
    return (
      <div className="colorPicker__container">
        <div onClick={this.toggleColorList} className="colorPicker" style={{
          backgroundColor: this.props.colors.selectedColor, padding: "1rem"
        }}/>
        {
          this.state.show &&
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