import React, {Component} from "react";
import { connect } from "react-redux";
import ShallowCard from "./ShallowCard";

class CardsGroupList extends Component {
  render(){
    return (
      <div>
        {
          this.props.groups.length === 0 ? <p>no cards</p> :
          this.props.groups.map(group =>
            <ShallowCard
              key={group.id}
              {...group}
              edit={this.props.startEdit}
              view={this.props.viewGroup}
            />)
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    groups: state.groups
  }
};
export default connect(mapStateToProps)(CardsGroupList);