import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Homepage from "../components/Homepage";
import Navigation from "../components/Navigation/Navigation";
import Dashboard from "../components/dashboard/Dashboard";
import NotFoundPage from "../components/NotFoundPage";
import CreateFlashGroup from "../components/dashboard/cards/CreateFlashGroup";



const AppRouter = () => (
  <BrowserRouter>
    <React.Fragment>
      <Navigation/>
      <Switch>
        <Route exact={true} path="/" component={Homepage}/>
        <Route path="/dashboard" component={Dashboard}/>
        <Route component={NotFoundPage}/>
      </Switch>
    </React.Fragment>
  </BrowserRouter>
);

export default AppRouter;

