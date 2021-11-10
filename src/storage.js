import Automerge from 'automerge'
import localforage from 'localforage'
import { upgradeDataFormat } from './upgrader'

const stateKey = 'state'

const dataLoaded = (payload) => {
  return {
    type: "core/dataLoaded",
    payload: payload
  }
}

export const loadReducer = (state, action) => {
  if(action.type === "core/dataLoaded") {
    let data = Automerge.load(action.payload);
    data = upgradeDataFormat(data);
    return data;
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
    },
    version: 0
  })
}

export const loadState = (dispatch) => {
  localforage.getItem(stateKey)
    .then((val) => {
      if(val === null) {
        //Swap this out for 'leave the state alone' at some point
        dispatch(dataLoaded(Automerge.save(blankState())));
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



// const demoData = () => {
//   return Automerge.from(
//            {
//              boards: {
//                byId: {
//                  "board0": {
//                    id: "board0",
//                    title: "Test Board",
//                    lists: ["list0", "list1"]
//                  }
//                },
//                allIds: ["board0"]
//              },
//              cards: {
//                byId: {
//                  "card0": {
//                    id: "card1",
//                    title: "card title 1"
//                  },
//                  "card1": {
//                    id: "card2",
//                    title: "card title 2"
//                  },
//                  "card2": {
//                    id: "card3",
//                    title: "card title 3"
//                  },
//                },
//                allIds: [ "card1", "card2", "card3" ]
//              },
//              lists: {
//                byId: {
//                  "list0": {
//                    id: "list0",
//                    title: "list title 1",
//                    cards: ["card1"]
//                  },
//                  "list1": {
//                    id: "list1",
//                    listTitle: "list title 2",
//                    cards: ["card2", "card3"]
//                  }
//                },
//                allIds: [ "list1", "list2" ]
//              }
//            });
// }
