const quizzDefaultState = {
  defaultPercent: 10,
  currentPercent: 0,
  currentCount: 1
};

export default (state = quizzDefaultState, action) => {
  switch (action.type){
    case "SET_DEFAULT_PERCENT":
      return {...state, defaultPercent: action.percent};
    case "SET_START_PERCENT":
      return {...state, currentPercent: action.percent};
    case "INCREASE_CURRENT_PERCENT":
      return {...state, currentPercent: action.percent};
    case "INCREASE_COUNT":
      return {...state, currentCount: state.currentCount + 1};
    case "RESET_COUNT":
      return {...state, currentCount: 1};
    default:
      return state
  }
}