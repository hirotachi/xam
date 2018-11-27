

export default (state = [], action) => {
  switch (action.type) {
    case "SET_CURRENT_CARDS":
      return action.cards;
    case "ADD_CARD":
      return [...state, action.card];
    case "REMOVE_CARD":
      return state.filter(card => (card._id || card.id) !== action.id);
    case "UPDATE_CARD":
      return state.map(card => {
        if ((card._id || card.id) === action.id) {
          return { ...card, ...action.updates }
        } else {
          return card;
        }
      });
    case "CLEAR_CURRENT_CARDS":
      return [];
    default:
      return state;
  }
}