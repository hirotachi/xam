import React, {Component} from "react";
import {connect} from "react-redux";
import SearchDesktop from "../../Navigation/search/SearchDesktop";
import {AddIcon, LoginIcon, LogoutIcon, MenuIcon, SignUpIcon, SupportIcon} from "../../icons/icons";
import {requestLogout} from "../../../actions/auth/auth";
import {NavLink} from "react-router-dom";
import {setRef} from "../../../actions/support";
import {endCreationControls, endEditControls, endViewControls} from "../../../actions/controls";


class ControlsDesktop extends Component {

  componentDidUpdate() {
    //reset controls width when not unmounted properly
    const controls = document.querySelector(".controls");
    if(!!controls.style.width){
      controls.style = "";
    }
  }

  redirectHome = () => {
    this.props.dispatch(endViewControls());
    this.props.dispatch(endCreationControls());
    this.props.dispatch(endEditControls());
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
      <div className="controlsD">
        <h2 className="controlsD__logo" onClick={this.redirectHome}>XAM</h2>
        {
          !this.props.support.isSupport ?
            <div className="controlsD__btns">
              {
                Object.values(this.props.controls).indexOf(true) === -1 &&
                <SearchDesktop/>
              }
              {
                !this.props.controls.startCreate && !this.props.controls.startEdit &&
                <button className="controlsD__btn" onClick={this.props.add}>
                  <AddIcon style="controlsD__btn--icon"/><span>New group</span>
                </button>
              }
              <button className="controlsD__btn" onClick={this.props.list}>
                <MenuIcon style="controlsD__btn--icon"/><span>Groups List</span>
              </button>
              <button className="controlsD__support" onClick={this.props.supportRedirect}>
                <SupportIcon style="controlsD__support--icon"/><span>Support</span>
              </button>
              <button className="controlsD__logout" onClick={this.handleLogout}>
                <LogoutIcon style="controlsD__logout--icon"/><span>Logout</span>
              </button>
            </div> :
            <React.Fragment>
              {
                this.props.auth.auth ?
                <React.Fragment>
                  <button className="controlsD__btn">
                    <MenuIcon style="controlsD__btn--icon"/>
                    <span>Dashboard</span>
                  </button>
                  <button className="controlsD__logout"
                          onClick={this.handleLogout}>
                    <LogoutIcon style="controlsD__logout--icon"/><span>Logout</span>
                  </button>
                </React.Fragment> :
                  <div className="controlsD__support--btns">
                    <button className="controlsD__support--signup"
                            onClick={this.handleRequestSignUp}>
                      <SignUpIcon style="controlsD__support--signup-icon"/>
                      <span>sign up</span>
                    </button>
                    <button className="controlsD__support--login"
                      onClick={this.handleRequestLogin}>
                      <LoginIcon style="controlsD__support--login-icon"/>
                      <span>login</span>
                    </button>
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