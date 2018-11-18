const cardsDefaultState = [];
export default (state = cardsDefaultState, action) => {
  switch(action.type){
    // Group handlers========================================================
    case "ADD_GROUP":
      return [...state, action.cardGroup];
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
      return state.filter(group => group.id !== action.id);
    case "UPDATE_GROUP":
      return state.map(group => {
        if(group.id === action.id){
          return {...group, ...action.group}
        }else {
          return group;
        }
      });
    //========================================================

    //  Single card handlers=======================================================================
    case "ADD_CARD":
      return state.find(group => group.id === action.id).cards.push(action.card);
    case "REMOVE_CARD":
      return [
        ...state,
        state.find(group => group.id === action.groupId).cards
          .filter(card => card.id !== action.cardId)
      ];
    case "UPDATE_CARD":
      return [
        ...state,
        state.find(group => group.id === action.groupId).cards
          .map(card => {
            if(card.id === action.cardId){
              return {...card, ...action.updates}
            }else {
              return card;
            }
          })
      ];
    //  =======================================================================

    default :
      return state;
  }
};