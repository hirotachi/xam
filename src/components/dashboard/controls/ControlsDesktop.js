import React, {Component} from "react";
import {connect} from "react-redux";
import SearchDesktop from "../../Navigation/search/SearchDesktop";
import {AddIcon, LogoutIcon, MenuIcon, SupportIcon} from "../../icons/icons";
import {requestLogout} from "../../../actions/auth";


class ControlsDesktop extends Component {

  redirectHome = () => {
    this.props.redirect("/");
  };
  handleLogout = () => {
    this.props.dispatch(requestLogout());
  };
  render(){
    return (
      <div>
        <h2 onClick={this.redirectHome}>XAM</h2>
        <SearchDesktop/>
        <button onClick={this.props.add}><AddIcon/><span>New group</span></button>
        <button onClick={this.props.list}><MenuIcon/><span>Groups List</span></button>
        <button onClick={this.props.supportRedirect}><SupportIcon/></button>
        <button onClick={this.handleLogout}><LogoutIcon/><span>Logout</span></button>
      </div>
    );
  }
}

export default connect()(ControlsDesktop);