const filtersDefaultState = {
  sortBy: "date",
  search: ""
};

export default (state = filtersDefaultState, action) => {
  switch(action.type){
    case "SORT_BY_DATE":
      return {...state, sortBy: "date"};
    case "SORT_BY_NAME":
      return {...state, sortBy: "name"};
    case "FILTER_BY_SEARCH":
      return {...state, search: action.text};
    default:
      return state;
  }
}