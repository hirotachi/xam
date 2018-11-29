import React, {Component} from "react";
import { connect } from "react-redux";
import {filterBySearch} from "../../../actions/cardGroupsFilter";


class SearchDesktop extends Component{
  state = {
    search: ""
  };

  handleSearch = (e) => {
    const search = e.target.value;
    this.setState(() => ({search}));
    this.props.dispatch(filterBySearch(search));
  };

  render(){
    return (
      <React.Fragment>
        <input
        type="text"
        value={this.state.search}
        onChange={this.handleSearch}
        />
      </React.Fragment>
    );
  }
}

export default connect()(SearchDesktop);