import shortid from "shortid";


export const setCards = (cards) => {
  return {
    type: "SET_CURRENT_CARDS",
    cards
  }
};

export const addCard = (question = "", answer = undefined) => {
  return {
    type: "ADD_CARD",
    card: {
      id: shortid(),
      question,
      answer
    }
  }
};

export const removeCard = (id) => {
  return {
    type: "REMOVE_CARD",
    id,
  }
};

export const clearCurrentCards = () => {
  return {
    type: "CLEAR_CURRENT_CARDS"
  }
};