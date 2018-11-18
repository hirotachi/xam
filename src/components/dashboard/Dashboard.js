import React, {Component} from "react";
import requireAuth from "../RequireAuth";
import CardsGroupList from "./cards/CardsGroupList";
import CreateFlashGroup from "./cards/CreateFlashGroup";
import Controls from "./Controls";
import ViewGroup from "./cards/ViewGroup";


class Dashboard extends Component{
  state = {
    home: true,
    view: false,
    creation: false
  };
  handleAwayFromHome = () => {
    this.setState(() => ({home: false, creation: true}));
  };
  handleBackHome = () => {
    this.setState(() => ({home: true, creation: false, view: false}));
  };

  handleViewGroup = () => {
    this.setState(() => ({view: true, home: false}))
  };
  render(){
    return (
      <div>
          <Controls startCreation={this.handleAwayFromHome} back={this.handleBackHome}/>
        <div>
          {!this.state.view &&
            <React.Fragment>
              {this.state.creation ?
                <CreateFlashGroup backHome={this.handleBackHome}/> :
                <CardsGroupList
                  cancelEdit={this.handleBackHome}
                  startEdit={this.handleAwayFromHome}
                  viewGroup={this.handleViewGroup}
                />
              }
            </React.Fragment>
          }
          {
            this.state.view && <ViewGroup back={this.handleBackHome}/>
          }
        </div>
      </div>
    );
  }
}
export default requireAuth(Dashboard);