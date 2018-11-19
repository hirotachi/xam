import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import authReducer from "../reducers/auth";
import groupsReducer from "../reducers/cardGroups";
import currentGroupReducer from "../reducers/currentGroup";
import currentCardsReducer from "../reducers/cards";
import quizzSettingsReducer from "../reducers/quizzSettings";
import quizzReducer from "../reducers/quizz";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(combineReducers({
    auth: authReducer,
    groups: groupsReducer,
    currentGroup: currentGroupReducer,
    currentCards: currentCardsReducer,
    quizzSettings: quizzSettingsReducer,
    quizz: quizzReducer
  }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
}