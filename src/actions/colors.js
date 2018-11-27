export const setSelectedColor = (color) => {
  return {
    type: "SET_SELECTED_COLOR",
    color
  }
};

export const clearSelectedColor = () => ({type: "CLEAR_SELECTED_COLOR"});