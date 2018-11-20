import React, {Component} from "react";
import { connect } from "react-redux";
import ShallowCard from "./ShallowCard";
import cardGroupsFilter from "../../../selectors/cardGroupsFilter";
import Filters from "../Filters";

class CardsGroupList extends Component {
  render(){
    return (
      <div>
        <Filters/>
        {
          this.props.groups.length === 0 ? <p>no cards</p> :
          this.props.groups.map(group =>
            <ShallowCard
              key={group.id}
              {...group}
              edit={this.props.startEdit}
              view={this.props.viewGroup}
              redirect={this.props.redirect}
            />)
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    groups: cardGroupsFilter(state.groups, state.filters)
  }
};
export default connect(mapStateToProps)(CardsGroupList);