import axios from "axios";

export const enterSupport = () => {
  return {
    type: "ENTER_SUPPORT"
  }
};

export const leaveSupport = () => {
  return {
    type: "LEAVE_SUPPORT"
  }
};

export const setRef = (ref) => {
  return {
    type: "SET_REF",
    ref
  }
};

export const resetRef = () => {
  return {
    type: "RESET_REF"
  }
};

//ticket system===============================================================
const localhost = process.env.NODE_ENV === "production" ? "/" : "http://localhost:3000/";

export const sendTicket = (message) => {
  return (dispatch) => {
    axios.post(`${localhost}support`, message)
      .then((res) => {
        if(res.status === 200 && res.data.success){
          dispatch(ticketSent());
        }
      })
      .catch( err => dispatch(ticketNotSent()));
  }
};

export const ticketSent = () => ({type: "TICKET_SENT"});
export const ticketNotSent = () => ({type: "TICKET_NOT_SENT"});
export const ticketReset = () => ({type: "RESET_TICKET"});

