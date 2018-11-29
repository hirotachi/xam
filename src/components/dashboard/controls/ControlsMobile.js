import React, {Component} from "react";
import { AddIcon} from "../../icons/icons";


class ControlsMobile extends Component {

handleAddGroup = () => {
  this.props.startCreation();
};
  render(){
    return (
        <div onClick={this.handleAddGroup}>
          <AddIcon/>
        </div>
    );
  }
}


export default ControlsMobile;