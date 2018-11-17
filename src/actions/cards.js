import shortid from "shortid";


export const addGroup = () => {
  return {
    type: "ADD_GROUP",
    cardGroup: {
      id: shortid(),
      title: "Untitled",
      cards: [{
        question: "",
        answer: undefined
      }]
    }
  }
};