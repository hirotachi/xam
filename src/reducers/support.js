const supportDefaultState = {
  isSupport: false,
  isRef: false
};

export default (state = supportDefaultState, action) => {
  switch(action.type){
    case "ENTER_SUPPORT":
      return {...state, isSupport: true};
    case "LEAVE_SUPPORT":
      return {...state, isSupport: false};
    case "SET_REF":
      return {...state, isRef: action.ref};
    case "RESET_REF":
      return {...state, isRef: false};
    default :
      return state;
  }
};