export const setCurrentGroup = (id) => {
  return {
    type: "SET_CURRENT_GROUP",
    id
  }
};

export const clearCurrentGroup = () => {
  return {
    type: "CLEAR_CURRENT_GROUP"
  }
};

export const startEdit = (id) => {
  return {
    type: "START_EDIT_GROUP",
    id
  }
};

export const cancelEdit = () => {
  return {
    type: "CANCEL_EDIT_GROUP"
  }
};