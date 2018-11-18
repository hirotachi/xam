import { createStore, combineReducers } from "redux";
import authReducer from "../reducers/auth";
import groupsReducer from"../reducers/cards";
import currentGroupReducer from "../reducers/currentGroup";

export default () => {
  const store = createStore(combineReducers({
    auth: authReducer,
    groups: groupsReducer,
    currentGroup: currentGroupReducer
  }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
}