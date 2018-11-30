const controlsDefaultState = {
  startView: false,
  startEdit: false,
  startCreate: false
};

export default (state = controlsDefaultState, action) => {
  switch(action.type){
    case "START_CREATION":
      return {...state, startCreate: true};
    case "END_CREATION":
      return {...state, startCreate: false};
    case "START_VIEW":
      return {...state, startView: true};
    case "END_VIEW":
      return {...state, startView: false};
    case 'START_EDIT':
      return {...state, startEdit: true};
    case "END_EDIT":
      return {...state, startEdit: false};
    case "RESET_CONTROLS":
      return controlsDefaultState;
    default:
      return state;
  }
}