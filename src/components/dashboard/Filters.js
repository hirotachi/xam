import React, { Component } from "react";
import { connect } from "react-redux";
import { sortByDate, sortByName } from "../../actions/cardGroupsFilter";
import {SortByDateIcon, SortByNameIcon, SortIcon} from "../icons/icons";


class Filters extends Component {
  state = {
    sort: "date",
    showSort: false,
    inAnimation: screen.width > 480 ? "slide_left-in" : "slide_up-in",
    outAnimation: screen.width > 480 ? "slide_left-out" : "slide_down-out"
  };

  componentDidMount() {
    this.props.dispatch(sortByDate());
    window.addEventListener("resize", this.setAnimations);
  }
  componentWillUnmount() {
    clearTimeout(this.hideSortBtns);
    window.removeEventListener("resize", this.setAnimations);
  }

  setAnimations = () => {
    this.setState(() => ({
      inAnimation: screen.width > 480 ? "slide_left-in" : "slide_up-in",
      outAnimation: screen.width > 480 ? "slide_left-out" : "slide_down-out"
    }))
  };

  sortMenu = () => {
    //add animation to filters buttons on hiding
    const dateBtn= document.querySelector(".filters__date");
    const nameBtn= document.querySelector(".filters__name");

    if(this.state.showSort){
      dateBtn.style.opacity = 1;
      dateBtn.classList.remove(this.state.inAnimation);
      dateBtn.classList.add(this.state.outAnimation);

      nameBtn.style.opacity = 1;
      nameBtn.classList.remove(this.state.inAnimation);
      nameBtn.classList.add(this.state.outAnimation);
      this.hideSortBtns = setTimeout(() => {
        this.setState(() => ({showSort: !this.state.showSort}));
        nameBtn.style = "";
        dateBtn.style = "";
      }, 500)
    }else {
      this.setState(() => ({showSort: !this.state.showSort}));
    }
  };

sortByDate = () => {
  this.props.dispatch(sortByDate());
};
sortByName = () => {
  this.props.dispatch(sortByName());
};
  render() {
    return (
      <div className="filters">
        <button onClick={this.sortMenu} className="filters__btn filters__sort">
          <SortIcon style="filters__btn--icon"/>
        </button>
        {
          this.state.showSort &&
          <React.Fragment>
            <button onClick={this.sortByDate}
                    className={`filters__btn filters__date
                    ${this.state.inAnimation}`}>
              <SortByDateIcon style="filters__btn--icon"/>
            </button>
            <button onClick={this.sortByName}
                    className={`filters__btn filters__name
                    ${this.state.inAnimation}`}>
              <SortByNameIcon style="filters__btn--icon "/>
            </button>
          </React.Fragment>
        }

      </div>
    );

  }
}

export default connect()(Filters);