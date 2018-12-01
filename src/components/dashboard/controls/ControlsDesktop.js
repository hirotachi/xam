import React, {Component} from "react";
import {connect} from "react-redux";
import SearchDesktop from "../../Navigation/search/SearchDesktop";
import {AddIcon, LogoutIcon, MenuIcon, SupportIcon} from "../../icons/icons";
import {requestLogout} from "../../../actions/auth/auth";
import {NavLink} from "react-router-dom";
import {setRef} from "../../../actions/support";


class ControlsDesktop extends Component {

  redirectHome = () => {
    this.props.history.push("/");
  };
  handleLogout = () => {
    this.props.dispatch(requestLogout());
  };

  handleRequestLogin = () => {
    this.props.dispatch(setRef({isRef: true, request: "login"}));
    this.props.history.push("/");
  };
  handleRequestSignUp = () => {
    this.props.dispatch(setRef({isRef: true, request: "signup"}));
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <h2 onClick={this.redirectHome}>XAM</h2>
        {
          !this.props.support.isSupport ?
            <React.Fragment>
              {
                Object.values(this.props.controls).indexOf(true) === -1 &&
                <SearchDesktop/>
              }
              {
                !this.props.controls.startCreate && !this.props.controls.startEdit &&
                <button onClick={this.props.add}><AddIcon/><span>New group</span></button>
              }
              <button onClick={this.props.list}><MenuIcon/><span>Groups List</span></button>
              <button onClick={this.props.supportRedirect}><SupportIcon/></button>
              <button onClick={this.handleLogout}><LogoutIcon/><span>Logout</span></button>
            </React.Fragment> :
            <React.Fragment>
              {
                this.props.auth.auth ?
                <React.Fragment>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                  <button onClick={this.handleLogout}><LogoutIcon/><span>Logout</span></button>
                </React.Fragment> :
                  <div>
                    <button onClick={this.handleRequestSignUp}>signup</button>
                    <button onClick={this.handleRequestLogin}>login</button>
                  </div>
              }
              <div>
              </div>
            </React.Fragment>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    controls: state.controls,
    support: state.support
  }
};
export default connect(mapStateToProps)(ControlsDesktop);