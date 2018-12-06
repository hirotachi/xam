import React, {Component} from "react";
import {connect} from "react-redux";
import {filterBySearch} from "../../../actions/cardGroupsFilter";
import {SearchIcon} from "../../icons/icons";


class SearchDesktop extends Component {
  state = {
    search: "",
    openSearch: false
  };

  handleSearch = (e) => {
    const search = e.target.value;
    this.setState(() => ({search}));
    this.props.dispatch(filterBySearch(search));
  };

  toggleSearch = () => {
    this.setState(() => ({openSearch: !this.state.openSearch}))
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