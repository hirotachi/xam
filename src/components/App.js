import React from "react";
import { Provider } from "react-redux";
import "normalize.css/normalize.css";
import "../styles/styles.scss";
import AppRouter from "../routers/AppRouter";
import configureStore from "../store/ConfigureStore";
import { addGroup } from "../actions/cardGroups";
import shortid from "shortid";


const store = configureStore();

store.dispatch(addGroup(shortid()));
const App = () => (
  <React.Fragment>
    <Provider store={store}>
      <AppRouter/>
    </Provider>
  </React.Fragment>
);

export default App;