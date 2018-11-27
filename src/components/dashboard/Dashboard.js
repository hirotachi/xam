import React, { Component } from "react";
import requireAuth from "../RequireAuth";
import CardsGroupList from "./cards/CardsGroupList";
import CreateFlashGroup from "./cards/CreateFlashGroup";
import Controls from "./Controls";
import ViewGroup from "./cards/view/ViewGroup";
import { requestLogout } from "../../actions/auth";
import { viewGroups } from "../../actions/cardGroups";
import { endCreationControls, endEditControls } from "../../actions/controls";


class Dashboard extends Component {
  state = {
    home: true,
    view: false,
    creation: false,
    startQuizz: false
  };

  componentWillMount() {
    if (!localStorage.xamUser) {
      this.props.dispatch(requestLogout());
    } else if (!localStorage.xamUser
      && !JSON.parse(localStorage.xamUser).auth
      && !JSON.parse(localStorage.xamUser).token
    ) {
      this.props.dispatch(requestLogout());
    }
  }

  componentDidMount() {
    if (this.props.token) {
      this.props.dispatch(viewGroups(this.props.token));
    }
  }
  componentDidUpdate() {
    const { startView, startCreate, startEdit } = this.props.controls;
    if ((!this.state.creation) && (startCreate || startEdit)) {
      this.handleEditOrCreate();
    } else if (!this.state.view && startView) {
      this.handleViewGroup();
    }
  }

  handleEditOrCreate = () => {
    const { startCreate, startEdit } = this.props.controls;
    if (startCreate || startEdit) {
      this.setState(() => ({ home: false, creation: true, view: false, startQuizz: false }));
    }
  };
  handleBackHome = () => {
    this.props.dispatch(endCreationControls());
    this.props.dispatch(endEditControls());
    this.setState(() => ({ home: true, creation: false, view: false, startQuizz: false }));
  };

  handleViewGroup = () => {
    this.setState(() => ({ view: true, home: false, creation: false, startQuizz: false }))
  };

  render() {
    return (
      <div className="dashboard">
        <Controls
          startCreation={this.handleEditOrCreate}
          back={this.handleBackHome}
          redirect={this.props.history.push}
        />
        <div className="dashboard__platform">
          {!this.state.view &&
            <React.Fragment>
              {this.state.creation ?
                <CreateFlashGroup backHome={this.handleBackHome} /> :
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
            this.state.view &&
            <ViewGroup
              back={this.handleBackHome}
              edit={this.handleEditOrCreate}
              redirect={this.props.history.push}
            />
          }
        </div>
      </div>
    );
  }
}
export default requireAuth(Dashboard);