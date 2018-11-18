export const turnOnRandom = () => {
  return {
    type: "RANDOM_ON"
  }
};

export const turnOffRandom = () => {
  return {
    type: "RANDOM_OFF"
  }
};
//==============================================

export const turnOnTimer = () => {
  return {
    type: "TURN_ON_TIMER"
  }
};

export const turnOffTimer = () => {
  return {
    type: "TURN_OFF_TIMER"
  }
};

export const setTimer = (time = 10000) => {
  return {
    type: "SET_TIMER",
    time
  }
};

