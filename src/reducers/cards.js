const cardsDefaultState = [];
export default (state = cardsDefaultState, action) => {
  switch(action.type){
    case "ADD_GROUP":
      return [...state, action.cardGroup];
    default :
      return state;
  }
};