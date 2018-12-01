import {requestEmailCheck} from "./auth";

const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//check password================================================
export const passMatch = () => {
  return {
    type: "PASS_MATCH"
  }
};
export const passNotMatch = () => {
  return {
    type: "PASS_NOT_MATCH"
  }
};
//check email format ===========================================
export const checkEmail = (email) => {
  return (dispatch) => {
    checkEmailFormat(email)
      .then(() => {
        dispatch(requestEmailCheck(email));
        dispatch(emailFormatApprove());
      })
      .catch(() => {
        dispatch(emailFormatReject())
      })
  }
};

const emailFormatApprove = () => ({type: "APPROVE_EMAIL_FORMAT"});
const emailFormatReject = () => ({type: "REJECT_EMAIL_FORMAT"});

const checkEmailFormat = (email) => {
  return new Promise((resolve, reject) => {
    if(regex.test(email)){
      resolve()
    }
    reject()
  })
};