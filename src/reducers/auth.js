const authDefaultState = {
  auth: false,
  userNameUsed: false,
  emailUsed: false,
  token: false
};

export default (state = authDefaultState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {...state, auth: true, token: action.token};
    case "LOGOUT":
      return {...state, auth: false, token: false};
    case "APPROVE_USERNAME":
      return {...state, userNameUsed: false};
    case "REJECT_USERNAME":
      return {...state, userNameUsed: true};
      case "APPROVE_EMAIL":
      return {...state, emailUsed: false};
    case "REJECT_EMAIL":
      return {...state, emailUsed: true};
    default:
      return state;
  }
}