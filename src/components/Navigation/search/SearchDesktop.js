import React, {Component} from "react";
import {connect} from "react-redux";
import {filterBySearch} from "../../../actions/cardGroupsFilter";
import {SearchIcon} from "../../icons/icons";


class SearchDesktop extends Component {
  state = {
    search: "",
    openSearch: false
  };

  componentWillUnmount() {
    if(this.state.openSearch){
      this.setState(() => ({openSearch: false}))
    }
    clearTimeout(this.showSearchBar);
    clearTimeout(this.hideSearchBar);
  }

  handleSearch = (e) => {
    const search = e.target.value;
    this.setState(() => ({search}));
    this.props.dispatch(filterBySearch(search));
  };
  animateSearchBar = () => {
    const searchBtn = document.querySelector(".controlsD__search--btn");
    const searchInput = document.querySelector(".controlsD__search--input");
    if(!this.state.openSearch){
      searchBtn.style.borderRadius = "0rem";
    }else {
      searchInput.style.borderRadius = "5rem";
    }
  };

  toggleSearch = () => {
    const controls = document.querySelector(".controls");
    if(!this.state.openSearch && screen.width > 768){
      this.animateSearchBar();
      this.hideSearchBar = setTimeout(() => {
        this.setState(() => ({openSearch: !this.state.openSearch}));
      }, 1000)
    } else if (this.state.openSearch && screen.width > 768){
      this.animateSearchBar();
      this.hideSearchBar = setTimeout(() => {
        this.setState(() => ({openSearch: !this.state.openSearch}));
      }, 500)
    }
    else if(!this.state.openSearch && screen.width <= 768){
      controls.style.width = "40%";
       this.showSearchBar = setTimeout(() => {
        this.setState(() => ({openSearch: !this.state.openSearch}));
      },500)
    }else if (screen.width <= 768 && screen.width > 480 ) {
      const searchBar = document.querySelector(".controlsD__search--input");
      searchBar.classList.remove("slide_right-in");
      this.hideSearchBar = setTimeout(() => {
        this.setState(() => ({openSearch: !this.state.openSearch}));
        controls.style = "";
      }, 500)
    }else {
      this.setState(() => ({openSearch: !this.state.openSearch}));
    }
  };

  render() {
    return (
      <div className="controlsD__search">
        {
          this.state.openSearch ?
            <input
              className="controlsD__search--input"
              autoFocus={true}
              type="text"
              value={this.state.search}
              onChange={this.handleSearch}
              onBlur={this.toggleSearch}
            /> :
            <button className="controlsD__search--btn" onClick={this.toggleSearch}>
              <SearchIcon style="controlsD__search--icon"/><span>Search</span>
            </button>
        }

      </div>
    );
  }
}

export default connect()(SearchDesktop);