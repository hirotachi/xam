import React, { Component } from "react";
import orientationChecker from "./orientation";

class Responsive extends Component {
  state = {
    show: true
  };

  componentWillMount() {
    this.responsive();
  }

  componentWillUnmount(){
    window.removeEventListener("resize", this.responsive);
  }

  responsive = () => {
    if ( this.props.query ) { // if query props is defined else don't anything
      window.addEventListener("resize", this.responsive);
      const { maxWidth = "", minWidth = "", orientation = "" } = this.props.query;
      const screenWidth = screen.width;
      //Width===========================================================
      const maxWidthCheck = this.widthChecker("maxWidth", maxWidth, screenWidth);
      const minWidthCheck = this.widthChecker("minWidth", minWidth, screenWidth);
      if(!!maxWidth){
        this.showChecker(maxWidthCheck);
      }else if(!!minWidth){
        this.showChecker(minWidthCheck);
      }
    //  Orientation============================================================
          const orientationCheck = orientationChecker(orientation);
        if(!!orientation){
          this.showChecker(orientationCheck);
        }
    }
  };
  // single query checker=======================================================================
  showChecker = (property) => { // shows children if property is defined and true
    if(property !== null && property === true){
      this.setState(() => ({show: true}));
    }else {
      this.setState(() => ({show: false}));
    }
  };

  widthChecker = (term, width, screenWidth) => { // check width and return result
    const widthCheck = term === "maxWidth" ? !!width &&  width >= screenWidth : !!width &&  width <= screenWidth;
    if ( !!width && widthCheck ) {
      return true
    } else if (!width) {
      return null
    }else {
      return false
    }
  };
//===========================================================================
  render() {
    return (
      <React.Fragment>
        {this.state.show && this.props.children}
      </React.Fragment>
    );
  }
}

export default Responsive;