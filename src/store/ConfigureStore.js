import { createStore, combineReducers } from "redux";
import authReducer from "../reducers/auth";
import cardsReducer from"../reducers/cards";

export default () => {
  const store = createStore(combineReducers({
    auth: authReducer,
    cards: cardsReducer
  }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
}