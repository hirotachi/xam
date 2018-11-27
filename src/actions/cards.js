import shortid from "shortid";


export const setCards = (cards) => {
  return {
    type: "SET_CURRENT_CARDS",
    cards
  }
};

export const addCard = (id, question = "", answer = undefined) => {
  return {
    type: "ADD_CARD",
    card: {
      id,
      question,
      answer,
      withAnswer: false
    }
  }
};

export const removeCard = (id) => {
  return {
    type: "REMOVE_CARD",
    id,
  }
};


export const updateCard = (id, updates) => {
  return {
    type: "UPDATE_CARD",
    id,
    updates
  }
};

export const clearCurrentCards = () => {
  return {
    type: "CLEAR_CURRENT_CARDS"
  }
};