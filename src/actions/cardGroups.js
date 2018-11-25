import shortid from "shortid";
import moment from "moment";
import axios from "axios";
import { setCurrentGroup } from "./currentGroup";
import { setCards } from "./cards";
import { startCreationControls } from "./controls";

//add initial group for new users ===========================================
export const setInitialGroups = (token) => {
  return (dispatch) => {
    axios("http://localhost:3000/dashboard/create", {
      method: "POST",
      data: {
        group: {
          createdAt: moment().valueOf(),
          title: "love it now",
          cards: [{
            question: "add Question",
            answer: "nothing",
            withAnswer: true
          }]
        }
      },
      headers: {
        authorization: token
      }
    })
      .then(({ data }) => {
        const { _id, title, createdAt, cards } = data;
        dispatch(addGroup({ _id, title, createdAt, cards }));
      })
      .catch(err => console.log(err))
  }
};
//add Group========================================================
export const addGroup = (group) => {
  return {
    type: "ADD_GROUP",
    group
  }
};

export const startAddGroup = (token) => {
  return (dispatch) => {
    axios("http://localhost:3000/dashboard/create", {
      method: "POST",
      data: {
        group: {
          createdAt: moment().valueOf(),
          title: "Title",
          cards: [{
            question: "add Question",
            answer: "nothing",
            withAnswer: true
          }]
        }
      },
      headers: {
        authorization: token
      }
    })
      .then(({ data }) => {
        const { _id, title, createdAt, cards } = data;
        dispatch(addGroup({ _id, title, createdAt, cards }));
        dispatch(setCurrentGroup(_id));
        dispatch(setCards(cards));
        dispatch(startCreationControls());
      })
      .catch(err => console.log(err))
  }
};
// cancelGroup creation=============================================================================


export const cancelGroupCreation = (id) => {
  return {
    type: "CANCEL_GROUP_CREATION",
    id
  }
};

export const startCancelGroupCreation = (groupId, token, groups) => {
  return (dispatch) => {
    axios("http://localhost:3000/dashboard/remove", {
      method: "POST",
      data: { groupId, groups },
      headers: {
        authorization: token
      }
    })
      .then(() => {
        dispatch(removeGroup(groupId))
        dispatch(cancelGroupCreation(groupId))
      })
      .catch(err => console.log(err));
  }
};

//=========================================================================
export const saveGroup = (groups) => {
  return {
    type: "SAVE_GROUPS",
    groups
  }
};

export const startSaveGroup = (groupId, token, group) => {
  return (dispatch) => {
    axios("http://localhost:3000/dashboard/save", {
      method: "POST",
      data: { groupId, group },
      headers: {
        authorization: token
      }
    })
      .then(({ data }) => dispatch(saveGroup(data)))
      .catch(err => console.log(err))
  }
};
//=========================================================================


export const removeGroup = (id) => {
  return {
    type: "REMOVE_GROUP",
    id
  }
};
export const startRemoveGroup = (groupId, token, groups) => {
  return (dispatch) => {
    axios("http://localhost:3000/dashboard/remove", {
      method: "POST",
      data: { groupId, groups },
      headers: {
        authorization: token
      }
    })
      .then(() => dispatch(removeGroup(groupId)))
      .catch(err => console.log(err));
  }
};
//=========================================================================

export const updateGroup = (id, group) => {
  return {
    type: "UPDATE_GROUP",
    id,
    group
  }
};
//========================================================

export const viewGroups = (token) => {
  return (dispatch) => {
    axios("http://localhost:3000/dashboard/view", {
      method: "GET",
      headers: {
        authorization: token
      }
    })
      .then(({ data }) => {
        const groups = [];
        Object.entries(data).forEach(([key, value]) => !!value && groups.push(value));
        dispatch(setGroups(groups))
      })

      .catch(err => console.log(err))
  }
};

const setGroups = (groups) => {
  return {
    type: "SET_GROUPS",
    groups
  }
};