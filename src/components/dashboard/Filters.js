import React, { Component } from "react";
import { connect } from "react-redux";
import { sortByDate, sortByName } from "../../actions/cardGroupsFilter";


class Filters extends Component {
  state = {
    sort: "date"
  };

  handleOptionChange = (e) => {
    const sort = e.target.value;
    this.setState(() => ({ sort }));
    if(sort === "date"){
      this.props.dispatch(sortByDate())
    }else if (sort === "name"){
      this.props.dispatch(sortByName())
    }
  };

  render() {
    return (
      <div className="filters">
        <select name="sort" value={this.state.sort} onChange={this.handleOptionChange}>
          <option value="date">Date</option>
          <option value="name">Name</option>
        </select>
      </div>
    );

  }
}

export default connect()(Filters);