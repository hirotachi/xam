import React, {Component} from "react";
import {connect} from "react-redux";
import {CloseIcon, MenuIcon} from "../icons/icons";
import SearchMobile from "./search/SearchMobile";
import {NavLink} from "react-router-dom";
import {requestLogout} from "../../actions/auth/auth";
import {setRef} from "../../actions/support";

class NavigationMobile extends Component {
  state = {
    searchBar: false,
    showMenu: false
  };

  //Menu handlers===========================================
  showMenu = () => {
    this.setState(() => ({showMenu: true}));
  };
  hideMenu = () => {
    this.setState(() => ({showMenu: false}));
  };

  //===========================================
  handleLogout = () => {
    this.props.dispatch(requestLogout());
  };

  handleSignUp = () => {
    this.props.dispatch(setRef({location: this.props.redirect.location.pathname, request: "signup"}));
    this.props.redirect.history.push("/");
  };

  handleLogin = () => {
    this.props.dispatch(setRef({location: this.props.redirect.location.pathname, request: "login"}));
    this.props.redirect.history.push("/");
  };

  goHome = () => {
    this.props.redirect.history.push("/")
  };

  render() {
    return (
      <div>
        {
          this.props.auth && Object.values(this.props.controls).indexOf(true) === -1 &&
          this.props.redirect.location.pathname !== "/support" &&
          <SearchMobile/>
        }
        <p onClick={this.goHome}>XAM</p>
        {
          this.state.showMenu ?
            <div onClick={this.hideMenu}><CloseIcon/></div> :
            <div onClick={this.showMenu}><MenuIcon/></div>
        }
        {
          this.state.showMenu &&
          <div>
            {
              this.props.auth &&
              <button onClick={this.handleLogout}>Logout</button>
            }
            {
              this.props.redirect.location.pathname === "/dashboard" ?
                <NavLink to="/support">support</NavLink> :
                <React.Fragment>
                  {
                    this.props.auth ?
                      <NavLink to="/dashboard">Dashboard</NavLink> :
                      <div>
                        <button onClick={this.handleLogin}>Login</button>
                        <button onClick={this.handleSignUp}>Signup</button>
                      </div>
                  }
                </React.Fragment>
            }
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth.auth,
    support: state.support,
    controls: state.controls
  }
};

export default connect(mapStateToProps)(NavigationMobile);