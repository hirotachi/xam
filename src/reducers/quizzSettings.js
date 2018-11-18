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
      return {...state, timer: {...timer, enabled: true}};
    case "TURN_OFF_TIMER":
      return {...state, timer: {...timer, enabled: false}};
    case "SET_TIMER":
      return {...state, timer: {...timer, time: action.time}};
    default:
      return state;
  }
}