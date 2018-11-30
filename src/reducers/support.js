const supportDefaultState = {
  isSupport: false,
  isRef: false,
   sent: false
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
    case "TICKET_SENT":
      return {...state, sent: true};
    case "TICKET_NOT_SENT":
      return {...state, sent: null};
    case "RESET_TICKET":
      return {...state, sent: false};
    default :
      return state;
  }
};