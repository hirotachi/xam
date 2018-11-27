import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import authReducer from "../reducers/auth";
import groupsReducer from "../reducers/cardGroups";
import currentGroupReducer from "../reducers/currentGroup";
import currentCardsReducer from "../reducers/cards";
import quizzSettingsReducer from "../reducers/quizzSettings";
import quizzReducer from "../reducers/quizz";
import filtersReducer from "../reducers/filters";
import supportReducer from "../reducers/support";
import controlsReducer from "../reducers/controls";
import colorsReducer from "../reducers/colors";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(combineReducers({
    auth: authReducer,
    groups: groupsReducer,
    currentGroup: currentGroupReducer,
    currentCards: currentCardsReducer,
    quizzSettings: quizzSettingsReducer,
    quizz: quizzReducer,
    filters: filtersReducer,
    support: supportReducer,
    controls: controlsReducer,
    colors: colorsReducer
  }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
}