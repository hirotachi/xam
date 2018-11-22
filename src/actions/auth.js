import axios from "axios";
import jwt from "jwt-simple";
import existEncrypt from "../../existEncrypt";

export const login = (token) => {
  return {
    type: "LOGIN",
    token
  }
};

export const logout = () => {
  return {
    type: "LOGOUT"
  }
};

export const requestSignup = (info) => {
  return (dispatch) => {
    axios.post("/signup", info)
      .then(({data}) => {
        if(!!data.status){
          const status = jwt.decode(data.status, existEncrypt.secret);
          if(status.sub === "409"){
            dispatch(requestUserNameCheck(info.userName));
            dispatch(requestEmailCheck(info.email));
          }
        }else {
          dispatch(login(data.token))
        }

      })
      .catch(err => console.log(err))
  }
};


//check Username and email==========================================================
//Username
export const requestUserNameCheck = (userName) => {
  return (dispatch) => {
    if(!userName){
      dispatch(approveUserName())
    }
    axios.post("/check", {userName, currentCheck: "userName"})
      .then(({data}) => {
        if(data.userNameUsed){
          dispatch(rejectUsername())
        }else {
          dispatch(approveUserName())
        }
      })
      .catch(err => console.log(err))
  }
};
export const approveUserName = () => {
  return {
    type: "APPROVE_USERNAME"
  }
};
export const rejectUsername = () => {
  return {
    type: "REJECT_USERNAME"
  }
};
// email
export const requestEmailCheck = (email) => {
  return (dispatch) => {
    if(!email){
      dispatch(approveEmail())
    }
    axios.post("/check", {email, currentCheck: "email"})
      .then(({data}) => {
        if(data.emailUsed){
          dispatch(rejectEmail())
        }else {
          dispatch(approveEmail())
        }
      })
      .catch(err => console.log(err))
  }
};
export const approveEmail = () => {
  return {
    type: "APPROVE_EMAIL"
  }
};
export const rejectEmail = () => {
  return {
    type: "REJECT_EMAIL"
  }
};
//==========================================================


