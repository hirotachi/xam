import axios from "axios";

export const login = () => {
  return {
    type: "LOGIN"
  }
};

export const logout = () => {
  return {
    type: "LOGOUT"
  }
};

export const requestAuth = (info) => {
  return (dispatch) => {
    console.log(info);
    dispatch(login());
  }
};


