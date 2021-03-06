const authDefaultState = {
  auth: false,
  userNameUsed: false,
  emailUsed: false,
  token: false,
  wrongCred: false,
  passMatch: false,
  emailFormat: false
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
    case "REJECT_CREDENTIALS":
      return {...state, wrongCred: true};
    case "APPROVE_CREDENTIALS":
      return {...state, wrongCred: false};
    case "PASS_MATCH":
      return {...state, passMatch: false};
    case "PASS_NOT_MATCH":
      return { ...state, passMatch: true};
    case "APPROVE_EMAIL_FORMAT":
      return {...state, emailFormat: false};
    case "REJECT_EMAIL_FORMAT":
      return {...state, emailFormat: true};
    default:
      return state;
  }
}