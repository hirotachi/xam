
//Percent===================================================
export const setDefaultPercent = (percent) => {
  return {
    type: "SET_DEFAULT_PERCENT",
    percent
  }
};

export const setStartPercent = (percent) => {
  return {
    type: "SET_START_PERCENT",
    percent
  }
};

export const startSetStartPercent = (percent) => {
  return (dispatch) => {
    const defaultPercent = percent;
    dispatch(setDefaultPercent(defaultPercent));
    dispatch(setStartPercent(defaultPercent));
  };
};

export const increaseCurrentPercent = (percent) => {
  return {
    type: "INCREASE_CURRENT_PERCENT",
    percent
  }
};
//Count===================================================
export const increaseCount = () => {
  return {
    type: "INCREASE_COUNT"
  }
};

export const increaseCountAndPercent = (count, defaultPercent) => {
  return (dispatch) => {
    dispatch(increaseCount());
    const percent = count * defaultPercent;
    dispatch(increaseCurrentPercent(percent))
  }
};

export const resetCount = () => {
  return {
    type: "RESET_COUNT"
  }
};

