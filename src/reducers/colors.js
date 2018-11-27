const colorsDefaultState = {
colorsList: [
  "#1DB954", "#A6A7A9", "#312E27", "#CF5586", "#5EC1D2", "#EDC712",
  "#C92327", "#0074B1", "#CFBA00", "#017538", "#1D1D1D", "#DB6920",
  "#463429"
],
  selectedColor: ""
};

export default (state = colorsDefaultState, action) => {
  switch(action.type){
    case "SET_SELECTED_COLOR":
      return {...state, selectedColor: action.color};
    case "CLEAR_SELECTED_COLOR":
      return colorsDefaultState;
    default:
      return state;
  }
}