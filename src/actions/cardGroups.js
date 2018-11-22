import shortid from "shortid";
import moment from "moment";
import axios from "axios";


//Card groups actions========================================================
export const addGroup = (id) => {
  return {
    type: "ADD_GROUP",
    group: {
      id,
      createdAt: moment().valueOf(),
      title: "Title",
      cards: [{
        id: shortid(),
        question: "add Question",
        answer: "nothing",
        withAnswer: true
      }]
    }
  }
};
//=============================================================================


export const cancelGroupCreation = (id) => {
  return {
    type:"CANCEL_GROUP_CREATION",
    id
  }
};

//=========================================================================
export const saveGroup = (id, group) => {
  return {
    type: "SAVE_GROUP",
    id,
    group
  }
};

export const startSaveGroup = (group) => {

};
//=========================================================================


export const removeGroup = (id) => {
  return {
    type: "REMOVE_GROUP",
    id
  }
};

export const updateGroup = (id, group) => {
  return {
    type: "UPDATE_GROUP",
    id,
    group
  }
};
//========================================================