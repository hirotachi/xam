import React, {Component} from "react";
import {connect} from "react-redux";
import {addGroup, setInitialGroups, startAddGroup} from "../../../actions/cardGroups";
import shortid from "shortid";
import {setCurrentGroup} from "../../../actions/currentGroup";
import {resetRef} from "../../../actions/support";
import ControlsMobile from "./ControlsMobile";
import Responsive from "../../../Responsive/Responsive";
import ControlsDesktop from "./ControlsDesktop";


class Controls extends Component {

  handleAddGroup = () => {
    const {colorsList} = this.props.colors;
    this.props.startCreation();
    this.props.dispatch(startAddGroup(this.props.token, colorsList[0]))
  };

  handleRequestSupport = () => {
    this.props.history.push("/support");
  };

  handleShowList = () => {
    this.props.back();
  };

  render() {
    return (
      <div className="controls">
        <Responsive query={{maxWidth: 480}}>
          {
            !(this.props.controls.startCreate ||
              this.props.controls.startEdit ||
                this.props.controls.startView
            ) &&
            <ControlsMobile startCreation={this.handleAddGroup}/>
          }
        </Responsive>
        <Responsive query={{minWidth: 480}}>
          <ControlsDesktop
            {...this.props}
            add={this.handleAddGroup}
            list={this.handleShowList}
            supportRedirect={this.handleRequestSupport}
          />
        </Responsive>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    refrence: state.support.isRef.location,
    token: state.auth.token,
    controls: state.controls,
    colors: state.colors
  }
};
export default connect(mapStateToProps)(Controls);