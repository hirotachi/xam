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

export const requestLogout = () => {
  return (dispatch) => {
    localStorage.removeItem("xamUser");
    dispatch(logout())
  }
};

export const requestSignup = (info) => {
  return (dispatch) => {
    axios.post("http://localhost:3000/signup", info)
      .then(({data}) => {
        if(!!data.status){
          const status = jwt.decode(data.status, existEncrypt.secret);
          if(status.sub === "409"){
            dispatch(requestUserNameCheck(info.userName));
            dispatch(requestEmailCheck(info.email));
          }
        }else {
          localStorage.xamUser = JSON.stringify({auth: true, token: data.token});
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
    axios.post("http://localhost:3000/check", {userName, currentCheck: "userName"})
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
    axios.post("http://localhost:3000/check", {email, currentCheck: "email"})
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

//requestLogin
export const requestLogin = (info) => {
  return (dispatch) => {
    axios.post("http://localhost:3000/login", info)
      .then(({data}) => {
        localStorage.xamUser = JSON.stringify({auth: true, token: data.token});
        dispatch(login(data.token))
      })
    .catch((err) => {
      dispatch(rejectCred())
    })
  }
};

export const rejectCred = () => {
  return {
    type: "REJECT_CREDENTIALS"
  }
};
export const approveCred = () => {
  return {
    type: "APPROVE_CREDENTIALS"
  }
};

//===========================================================
//Remember user
export const requestAuth = () => {
  return (dispatch) => {
    const {token} = JSON.parse(localStorage.xamUser);
    axios("http://localhost:3000/auth", {
      headers: {
        authorization: token
      }
    })
      .then(({data}) => {
        if(data.success){
          dispatch(login(token))
        }
      })
      .catch(err => console.log(err))
  }
};

