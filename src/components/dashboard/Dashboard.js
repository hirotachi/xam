import React, {Component} from "react";
import requireAuth from "../RequireAuth";
import CardsGroupList from "./cards/CardsGroupList";
import CreateFlashGroup from "./cards/CreateFlashGroup";


class Dashboard extends Component{
  state = {
    home: true
  };
  handleAddCardGroup = () => {
    this.setState(() => ({home: false}));
  };
  handleCancelCreation = () => {
    this.setState(() => ({home: true}));
  };
  render(){
    return (
      <div>
        <div>
          <button onClick={this.handleAddCardGroup}>add</button>
          <button>list</button>
          <button>support</button>
        </div>
        <div>
          {this.state.home ? <CardsGroupList/> : <CreateFlashGroup cancel={this.handleCancelCreation}/>}
        </div>
      </div>
    );
  }
}
export default requireAuth(Dashboard);