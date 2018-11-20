import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import { filterBySearch } from "../../actions/cardGroupsFilter";
import Responsive from "../../Responsive/Responsive";


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
        <Responsive query={{orientation: "landscape"}}>
          <input
            onChange={this.handleSearchChange}
            value={this.state.search}
            type="text"
            placeholder="Search"
          />
        </Responsive>

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