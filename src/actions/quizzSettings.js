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

export const setTimer = (minutes, seconds) => {
    return {
      type: "SET_TIMER",
      time: {
        minutes: seconds > 59 ? 1 : minutes,
        seconds: seconds > 59 ? seconds - 59 : seconds
      }
    }
};

export const startSetTimer = (time) => {
  return (dispatch) => {
    let {seconds = 0, minutes= 0} = time;
    if(seconds > 59){
      minutes = Math.floor(seconds / 60);
      seconds = 0;
    dispatch(setTimer(minutes, seconds));
    }else {
      dispatch(setTimer(minutes, seconds));
    }
  }
};
//==============================================
export const resetSettings = () => {
  return {
    type: "RESET_SETTINGS"
  }
};

