import React from "react";
import { Provider } from "react-redux";
import "normalize.css/normalize.css";
import "../styles/styles.scss";
import AppRouter from "../routers/AppRouter";
import configureStore from "../store/ConfigureStore";


const store = configureStore();

const App = () => (
  <React.Fragment>
    <Provider store={store}>
      <AppRouter/>
    </Provider>
  </React.Fragment>
);

export default App;