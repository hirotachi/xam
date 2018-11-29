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
      <React.Fragment>
        {
          this.state.openSearch ?
            <input
              autoFocus={true}
              type="text"
              value={this.state.search}
              onChange={this.handleSearch}
              onBlur={this.toggleSearch}
            /> :
            <button onClick={this.toggleSearch}><SearchIcon/><span>Search</span></button>
        }

      </React.Fragment>
    );
  }
}

export default connect()(SearchDesktop);