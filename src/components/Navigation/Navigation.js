import React, { Component } from "react";
import Responsive from "../../Responsive/Responsive";
import NavigationMobile from "./NavigationMobile";


class Navigation extends Component {
  render() {
    return (
      <React.Fragment>
        {
          !(this.props.redirect.location.pathname === ("/quizz" || "/")) &&
          <Responsive query={{maxWidth: 480}}>
            <NavigationMobile {...this.props}/>
          </Responsive>
        }
      </React.Fragment>
    );
  }
}

export default Navigation;