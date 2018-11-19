const QuizzSettingsDefaultState = {
  random: false,
  timer: {
    enabled: false,
    time: 10000
  }
};

export default (state = QuizzSettingsDefaultState, action) => {
  switch(action.type){
    case "RANDOM_ON":
      return {...state, random: true};
    case "RANDOM_OFF":
      return {...state, random: false};
    case "TURN_ON_TIMER":
      return {...state, timer: {...state.timer, enabled: true}};
    case "TURN_OFF_TIMER":
      return {...state, timer: {...state.timer, enabled: false}};
    case "SET_TIMER":
      return {...state, timer: {...state.timer, time: action.time}};
    case "RESET_SETTINGS":
      return QuizzSettingsDefaultState;
    default:
      return state;
  }
}