import shortid from "shortid";

//Card groups actions========================================================
export const addGroup = (id) => {
  return {
    type: "ADD_GROUP",
    cardGroup: {
      id,
      title: "Untitled",
      cards: [ {
        question: "",
        answer: undefined
      } ]
    }
  }
};


export const cancelGroupCreation = (id) => {
  return {
    type:"CANCEL_GROUP_CREATION",
    id
  }
};

export const saveGroup = (id, group) => {
  return {
    type: "SAVE_GROUP",
    id,
    group
  }
};

export const removeGroup = (id) => {
  return {
    type: "REMOVE_GROUP",
    id
  }
};

export const updateGroup = (id, group) => {
  return {
    type: "UPDATE_GROUP",
    id,
    group
  }
};
//========================================================



// Single Card actions========================================

export const addCard = (id, {question, answer = undefined}) => {
  return {
    type: "ADD_CARD",
    id,
    card: {
      id: shortid(),
      question,
      answer
    }
  }
};

export const removeCard = (groupId, cardId) => {
  return {
    type: "REMOVE_CARD",
    groupId,
    cardId
  }
};

export const updateCard = (groupId, cardId, updates) => {
  return {
    type: "UPDATE_CARD",
    groupId,
    cardId,
    updates
  }
}
//========================================
