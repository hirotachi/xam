import { createStore, combineReducers } from "redux";
import authReducer from "../reducers/auth";
import groupsReducer from "../reducers/cardGroups";
import currentGroupReducer from "../reducers/currentGroup";
import currentCardsReducer from "../reducers/cards";

export default () => {
  const store = createStore(combineReducers({
    auth: authReducer,
    groups: groupsReducer,
    currentGroup: currentGroupReducer,
    currentCards: currentCardsReducer
  }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
}