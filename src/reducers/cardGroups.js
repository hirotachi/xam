const cardsDefaultState = [];

export default (state = cardsDefaultState, action) => {
  switch(action.type){
    case "ADD_GROUP":
      return [...state, action.group];
    case "CANCEL_GROUP_CREATION":
      return state.filter(group => group.id !== action.id);
    case "SAVE_GROUP":
      return state.map(group => {
        if(group.id === action.id){
          return {...group, ...action.group}
        }else {
          return group;
        }
      });
    case "REMOVE_GROUP":
      return state.filter(group => group._id !== action.id);
    case "UPDATE_GROUP":
      return state.map(group => {
        if(group.id === action.id){
          return {...group, ...action.group}
        }else {
          return group;
        }
      });
    case "SET_GROUPS":
      return action.groups;
    default :
      return state;
  }
};