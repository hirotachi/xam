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

  // search bar handlers===========================================
  showSearchBar = () => {
    this.setState(() => ({searchBar: true}))
  };
  hideSearchBar = () => {
    this.setState(() => ({searchBar: false}))
  };
  //===============================================================


  render() {
    return (
      <React.Fragment>
          {
            !this.state.searchBar &&
            <div onClick={this.showSearchBar}>
              <SearchIcon />
            </div>
          }
          {
            this.state.searchBar &&
            <div>
              <div onClick={this.hideSearchBar}><LeftArrowIcon/></div>
              <input
                autoFocus={true}
                onChange={this.handleSearchChange}
                value={this.state.search}
                type="text"
                placeholder="Search"
                onBlur={this.hideSearchBar}
              />
            </div>
          }
      </React.Fragment>
    );
  }
}

export default connect()(SearchMobile);