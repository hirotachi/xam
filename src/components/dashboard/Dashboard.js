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
  handleEditOrCreate = () => {
    this.setState(() => ({home: false, creation: true, view: false}));
  };
  handleBackHome = () => {
    this.setState(() => ({home: true, creation: false, view: false}));
  };

  handleViewGroup = () => {
    this.setState(() => ({view: true, home: false, creation: false}))
  };
  render(){
    return (
      <div>
          <Controls startCreation={this.handleEditOrCreate} back={this.handleBackHome}/>
        <div>
          {!this.state.view &&
            <React.Fragment>
              {this.state.creation ?
                <CreateFlashGroup backHome={this.handleBackHome}/> :
                <CardsGroupList
                  cancelEdit={this.handleBackHome}
                  startEdit={this.handleEditOrCreate}
                  viewGroup={this.handleViewGroup}
                />
              }
            </React.Fragment>
          }
          {
            this.state.view && <ViewGroup back={this.handleBackHome} edit={this.handleEditOrCreate}/>
          }
        </div>
      </div>
    );
  }
}
export default requireAuth(Dashboard);