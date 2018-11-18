const currentGroupDefaultState = {
  currentId: "",
  edit: false
};

export default (state = currentGroupDefaultState, action) => {
  switch (action.type){
    case "SET_CURRENT_GROUP":
      return {...state, currentId: action.id};
    case "CLEAR_CURRENT_GROUP":
      return {currentId: "", edit: false};
    case "START_EDIT_GROUP":
      return {currentId: action.id, edit: true};
    case "CANCEL_EDIT_GROUP":
      return currentGroupDefaultState;
    default:
      return state;
  }
}