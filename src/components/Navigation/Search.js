import React, {Component} from "react";
import { connect } from "react-redux";
import Responsive from "../../Responsive/Responsive";
import { filterBySearch } from "../../actions/cardGroupsFilter";


class Search extends Component {
  state = {
    search: ""
  };

  handleSearchChange = (e) => {
    const search = e.target.value;
    this.props.dispatch(filterBySearch(search));
    this.setState(() => ({ search }))
  };
  render(){
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
        <Responsive query={{maxWidth: 480}}>
          <button style={{display: "block"}}>search</button>
        </Responsive>
        <Responsive query={{minWidth: 769}}>
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