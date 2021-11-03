import Automerge from 'automerge'
import localforage from 'localforage'

const stateKey = 'state'

const demoData = () => {
  return Automerge.from(
           {
             boards: {
               byId: {
                 "board0": {
                   title: "Test Board",
                   lists: ["list0", "list1"]
                 }
               },
               allIds: ["board0"]
             },
             cards: {
               byId: {
                 "card0": {
                   id: "card1",
                   cardTitle: "card title 1"
                 },
                 "card1": {
                   id: "card2",
                   cardTitle: "card title 2"
                 },
                 "card2": {
                   id: "card3",
                   cardTitle: "card title 3"
                 },
               },
               allIds: [ "card1", "card2", "card3" ]
             },
             lists: {
               byId: {
                 "list0": {
                   id: "list0",
                   listTitle: "list title 1",
                   cards: ["card1"]
                 },
                 "list1": {
                   id: "list1",
                   listTitle: "list title 2",
                   cards: ["card2", "card3"]
                 }
               },
               allIds: [ "list1", "list2" ]
             }
           });
}

const dataLoaded = (payload) => {
  return {
    type: "core/dataLoaded",
    payload: payload
  }
}

export const loadReducer = (state, action) => {
  if(action.type === "core/dataLoaded") {
    return Automerge.load(action.payload)
  }
  return state;
}

export const blankState = () => {
  return Automerge.from({
    boards: {
      byId: {},
      allIds: []
    },
    cards: {
      byId: {},
      allIds: []
    },
    lists: {
      byId: {},
      allIds: []
    }
  })
}

export const loadState = (dispatch) => {
  localforage.getItem(stateKey)
    .then((val) => {
      if(val === null) {
        //Swap this out for 'leave the state alone' at some point
        dispatch(dataLoaded(Automerge.save(demoData())));
      } else {
        dispatch(dataLoaded(val));
      }
    })
};

export const saveState = (state) => {
  localforage.setItem(stateKey, Automerge.save(state))
    .then(() => console.log("Successfully saved"))
    .catch(e => console.error("Error saving state:" + e));
}
