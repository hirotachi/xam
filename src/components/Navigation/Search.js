import React, { Component } from "react";
import { connect } from "react-redux";
import Responsive from "../../Responsive/Responsive";
import { filterBySearch } from "../../actions/cardGroupsFilter";


class Search extends Component {
  state = {
    search: "",
    button: true
  };

  handleSearchChange = (e) => {
    const search = e.target.value;
    this.props.dispatch(filterBySearch(search));
    this.setState(() => ({ search }))
  };

  handleSearchClick = () => {
    this.setState(() => ({ button: false }))
  };
  handleBackToButton = () => {
    this.setState(() => ({ button: true }))
  };

  render() {
    return (
      <div>
        <Responsive query={{ orientation: "landscape" }}>
          <input
            onChange={this.handleSearchChange}
            value={this.state.search}
            type="text"
            placeholder="Search"
          />
        </Responsive>
        <Responsive query={{ maxWidth: 480 }}>
          {
            this.state.button ?
              <div>
                <button style={{ display: "block" }} onClick={this.handleSearchClick}>search</button>
                <span>search icon</span>
              </div>
               :
              <div>
                <span>left arrow</span>
                <input
                  autoFocus={true}
                  onChange={this.handleSearchChange}
                  value={this.state.search}
                  type="text"
                  placeholder="Search"
                  onBlur={this.handleBackToButton}
                />
              </div>
          }
        </Responsive>
        <Responsive query={{ minWidth: 769 }}>
          <input
            onChange={this.handleSearchChange}
            value={this.state.search}
            type="text"
            placeholder="Search"
          />
        </Responsive>
      </div>
    );
  }
}

export default connect()(Search);