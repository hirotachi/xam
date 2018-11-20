import React, {Component} from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Homepage from "../components/Homepage";
import Navigation from "../components/Navigation/Navigation";
import Dashboard from "../components/dashboard/Dashboard";
import NotFoundPage from "../components/NotFoundPage";
import Quizz from "../components/quizz/Quizz";
import Supportpage from "../components/support/Supportpage";



class AppRouter extends Component {
  state = {
    test: ""
  };
  render(){
    return (
      <BrowserRouter>
        <React.Fragment>
          <Route render={(props) => (
            <Navigation redirect={props}/>
          )}/>
            <Switch>
              <Route exact={true} path="/" component={Homepage}/>
              <Route path="/dashboard" component={Dashboard}/>
              <Route path="/quizz" component={Quizz}/>
              <Route path="/support" component={Supportpage}/>
              <Route component={NotFoundPage}/>
            </Switch>
        </React.Fragment>
      </BrowserRouter>
  );
  }
}

export default AppRouter;

