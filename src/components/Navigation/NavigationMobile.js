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
  componentDidUpdate(){
    const currentRoute = this.props.redirect.location.pathname;
    if(currentRoute === "/support"){
      const logo = document.querySelector(".nav__logo");
      logo.style.opacity = 0;
      const showLogo = setTimeout(() => {
        logo.classList.add("slide_down-in");
        clearTimeout(showLogo);
      }, 500)
    }
  }

  showMenu = () => {
    if (this.props.redirect.location.pathname === "/dashboard") { // if page is dashboard hide logo on menu open
      const logo = document.querySelector(".nav__logo");
      logo.classList.add("slide_up-out");
      logo.classList.remove("slide_down-in");
    }
    this.setState(() => ({showMenu: true}));
    const showMenu = setTimeout(() => {
      const menu = document.querySelector(".nav__menu");
      menu.classList.add("slide_down-in");
      clearTimeout(showMenu);
    }, 100);
  };
  hideMenu = () => { // if page is support keep logo
    const menu = document.querySelector(".nav__menu");
    menu.classList.add("slide_up-out");
    menu.classList.remove("slide_down-in");
    if (this.props.redirect.location.pathname === "/dashboard") {
      const hideLogo = setTimeout(() => {
        this.setState(() => ({showMenu: false}));
        const logo = document.querySelector(".nav__logo");
        logo.classList.remove("slide_up-out");
        logo.classList.add("slide_down-in");
        clearTimeout(hideLogo);
      }, 300);
    } else {
      const hideMenu = setTimeout(() => {
        this.setState(() => ({showMenu: false}));
        clearTimeout(hideMenu);
      }, 300);
    }
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
    this.props.redirect.history.push("/");
  };

  redirect = () => {
    this.hideMenu();
    const currentRoute = this.props.redirect.location.pathname;
    if( currentRoute === "/dashboard"){
      this.props.redirect.history.push("/support");
    }else if (currentRoute === "/support"){
      const logo = document.querySelector(".nav__logo");
      logo.classList.add("slide_up-out");
      logo.classList.remove("slide_down-in");
      const routeToDashboard = setTimeout(() => {
        this.props.redirect.history.push("/dashboard");
        clearTimeout(routeToDashboard);
      }, 500)
    }
  };

  render() {
    return (
      <div className="nav">
        {
          this.props.auth && Object.values(this.props.controls).indexOf(true) === -1 &&
          this.props.redirect.location.pathname !== "/support" &&
          <SearchMobile/>
        }
        <p className={`nav__logo slide_down-in logo${
          this.props.redirect.location.pathname === "/support" ? "--sup" : "--dash"
          }`}
           onClick={this.goHome}>XAM</p>
        {
          this.state.showMenu ?
            <div onClick={this.hideMenu}>
              <CloseIcon style="nav__menu--btn"/>
            </div> :
            <div onClick={this.showMenu}>
              <MenuIcon style="nav__menu--btn"/>
            </div>
        }
        {
          this.state.showMenu &&
          <div className="nav__menu">
            {
              this.props.auth &&
              <button className="nav__menu--link" onClick={this.handleLogout}>Logout</button>
            }
            {
              this.props.redirect.location.pathname === "/dashboard" ?
                <button className="nav__menu--link" onClick={this.redirect}>support</button> :
                <React.Fragment>
                  {
                    this.props.auth ?
                      <button className="nav__menu--link" onClick={this.redirect}>Dashboard</button> :
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