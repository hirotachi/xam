import React, {Component} from "react";
import { connect } from "react-redux";
import ShallowCard from "./ShallowCard";

class CardsGroupList extends Component {
  render(){
    return (
      <div>
        {
          this.props.cards.length === 0 ? <p>no cards</p> :
          this.props.cards.map(group => <ShallowCard key={group.id} title={group.title}/>)
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cards: state.cards
  }
};
export default connect(mapStateToProps)(CardsGroupList);