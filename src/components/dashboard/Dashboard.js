import React, {Component} from "react";
import requireAuth from "../RequireAuth";
import CardsGroupList from "./cards/CardsGroupList";
import CreateFlashGroup from "./cards/CreateFlashGroup";
import Controls from "./Controls";
import ViewGroup from "./cards/ViewGroup";
import Quizz from "./Quizz";


class Dashboard extends Component{
  state = {
    home: true,
    view: false,
    creation: false,
    startQuizz: false
  };
  handleEditOrCreate = () => {
    this.setState(() => ({home: false, creation: true, view: false, startQuizz: false}));
  };
  handleBackHome = () => {
    this.setState(() => ({home: true, creation: false, view: false, startQuizz: false}));
  };

  handleViewGroup = () => {
    this.setState(() => ({view: true, home: false, creation: false, startQuizz: false}))
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
                  redirect={this.props.history.push}
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