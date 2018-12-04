import React, { Component } from "react";
import { connect } from "react-redux";
import { filterBySearch } from "../../../actions/cardGroupsFilter";
import { LeftArrowIcon, SearchIcon} from "../../icons/icons";


class SearchMobile extends Component {
  state = {
    search: "",
    searchBar: false
  };
  handleSearchChange = (e) => {
    const search = e.target.value;
    this.props.dispatch(filterBySearch(search));
    this.setState(() => ({ search }))
  };

  componentWillUnmount() {
  //  shrink nav bar to original if the searchBar is still open but component unmounted
    const nav = document.querySelector(".nav");
    nav.style.marginBottom = "0";
  }


  // search bar handlers===========================================
  showSearchBar = () => {
    // fade the searchIcon out on click
    const searchIcon = document.querySelector(".search__btn");
    searchIcon.classList.add("fade-out");
    //increase nav height for search bar;
    const nav = document.querySelector(".nav");
    nav.style.marginBottom = "5rem";
    const showSearchBar = setTimeout(() => {
      this.setState(() => ({searchBar: true}));
      clearTimeout(showSearchBar);
    },300);
  };
  hideSearchBar = () => {
    // fade the searchIcon out on click
    const searchIcon = document.querySelector(".search__btn");
    searchIcon.classList.add("fade-out");
    //slide the search bar out
    const searchBar = document.querySelector(".search__bar");
    searchBar.classList.remove("slide_right-in");
    searchBar.classList.add("slide_right-out");
    const hideSearchBar = setTimeout(() => {
      this.setState(() => ({searchBar: false}));
      clearTimeout(hideSearchBar);
      //decrease nav height;
      const nav = document.querySelector(".nav");
      nav.style.marginBottom = "0";
    },300);
  };
  //===============================================================


  render() {
    return (
      <React.Fragment>
          {
            !this.state.searchBar &&
            <div onClick={this.showSearchBar}>
              <SearchIcon style="search__btn"/>
            </div>
          }
          {
            this.state.searchBar &&
            <div className="search">
              <div onClick={this.hideSearchBar}><LeftArrowIcon style="search__btn"/></div>
              <input
                className="search__bar slide_right-in slide-fast"
                autoFocus={true}
                onChange={this.handleSearchChange}
                value={this.state.search}
                type="text"
                placeholder="Search"
              />
            </div>
          }
      </React.Fragment>
    );
  }
}

export default connect()(SearchMobile);