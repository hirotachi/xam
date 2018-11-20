export const filterBySearch = (text) => {
  return {
    type: "FILTER_BY_SEARCH",
    text
  }
};

export const sortByDate = () => {
  return {
    type: "SORT_BY_DATE"
  }
};

export const sortByName = () => {
  return {
    type: "SORT_BY_NAME"
  }
};