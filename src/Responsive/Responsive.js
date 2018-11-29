import React, { Component } from "react";
import orientationChecker from "./orientation";

class Responsive extends Component {
  state = {
    show: true
  };

  componentDidMount() {
    this.query();
    this.queries();
  }

  componentWillUnmount(){
    window.removeEventListener("resize", this.query);
  }

  //Single query checker
  query = () => {
    if ( this.props.query ) { // if query props is defined else don't do anything
      window.addEventListener("resize", this.query);
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
  //   state handler for all queries=======================================================================
  showChecker = (property) => { // shows children if property is defined and true
    if(property !== null && property === true){
      this.setState(() => ({show: true}));
    }else {
      this.setState(() => ({show: false}));
    }
  };
  // multiple query checker =====================================================================
  queries = () => { // check all queries provided and set state of show
    if(!!this.props.queries){
      let queryList = [];
      window.addEventListener("resize", this.queries);
      Object.entries(this.props.queries).forEach(([key, value]) => {
        if(key.toLowerCase().includes("width")){
          queryList.push(this.widthChecker(key, value, screen.width))
        }else if (key.toLowerCase().includes("orientation")){
          queryList.push(orientationChecker(value))
        }
      });
      this.showChecker(!(queryList.indexOf(false) !== -1)); // set the show state if all queries are true
    }
  };
  //============================================================================================

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