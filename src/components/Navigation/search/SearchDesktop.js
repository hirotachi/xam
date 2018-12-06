import React, {Component} from "react";
import {connect} from "react-redux";
import {filterBySearch} from "../../../actions/cardGroupsFilter";
import {SearchIcon} from "../../icons/icons";


class SearchDesktop extends Component {
  state = {
    search: "",
    openSearch: true
  };

  handleSearch = (e) => {
    const search = e.target.value;
    this.setState(() => ({search}));
    this.props.dispatch(filterBySearch(search));
  };

  toggleSearch = () => {
    const controls = document.querySelector(".controls");
    if(!this.state.openSearch){
      controls.style.width = "40%";
      const showSearchBar = setTimeout(() => {
        this.setState(() => ({openSearch: !this.state.openSearch}));
        clearTimeout(showSearchBar);
      },500)
    }else {
      const searchBar = document.querySelector(".controlsD__search--input");
      searchBar.classList.remove("slide_right-in");
      searchBar.classList.add("slide_right-out");
      const hideSearchBar = setTimeout(() => {
        this.setState(() => ({openSearch: !this.state.openSearch}));
        controls.style.width = "10%";
        clearTimeout(hideSearchBar);
      }, 500)
    }
  };

  render() {
    return (
      <div className="controlsD__search">
        {
          this.state.openSearch ?
            <input
              className="controlsD__search--input slide_right-in"
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