import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import { filterBySearch } from "../../actions/cardGroupsFilter";


class Navigation extends Component {
  state = {
    search: ""
  };

  handleAuth = () => {
    this.props.dispatch(logout());
  };

  handleSearchChange = (e) => {
    const search = e.target.value;
    this.props.dispatch(filterBySearch(search));
    this.setState(() => ({ search }))
  };

  render() {
    return (
      <div>
        <input
          onChange={this.handleSearchChange}
          value={this.state.search}
          type="text"
          placeholder="Search"
        />
        {
          this.props.auth && <button onClick={this.handleAuth}>Logout</button>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
};

export default connect(mapStateToProps)(Navigation);