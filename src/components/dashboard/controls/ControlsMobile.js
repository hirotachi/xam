import React, {Component} from "react";
import {Add} from "../../icons/icons";


class ControlsMobile extends Component {

handleAddGroup = () => {
  this.props.startCreation();
};
  render(){
    return (
        <div onClick={this.handleAddGroup}>
          <Add/>
        </div>
    );
  }
}


export default ControlsMobile;