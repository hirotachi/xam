import React, {Component} from "react";
import { AddIcon} from "../../icons/icons";


class ControlsMobile extends Component {

handleAddGroup = () => {
  this.props.startCreation();
};
  render(){
    return (
        <div className="controls__add slide_up-in" onClick={this.handleAddGroup}>
          <AddIcon style="controls__add--icon"/>
        </div>
    );
  }
}


export default ControlsMobile;