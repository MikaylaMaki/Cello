import { configureStore } from '@reduxjs/toolkit'
import cardReducer from './components/card/cardSlice'
import listReducer from './components/list/listSlice'
import {loadState, saveState} from './localStorage'
import throttle from 'lodash/throttle'

let persistedState = loadState();
if(persistedState == null) {
  persistedState = {
    cards: {
      byId: {},
      allIds: []
    },
    lists: {
      byId: {},
      allIds: []
    }
  }
  // persistedState = {
  //   cards: {
  //     byId: {
  //       "card1": {
  //         id: "card1",
  //         cardTitle: "card title 1"
  //       },
  //       "card2": {
  //         id: "card2",
  //         cardTitle: "card title 2"
  //       },
  //       "card3": {
  //         id: "card3",
  //         cardTitle: "card title 3"
  //       },
  //     },
  //     allIds: [ "card1", "card2", "card3" ]
  //   },
  //   lists: {
  //     byId: {
  //       "list1": {
  //         id: "list1",
  //         listTitle: "list title 1",
  //         cards: ["card1"]
  //       },
  //       "list2": {
  //         id: "list2",
  //         listTitle: "list title 2",
  //         cards: ["card2", "card3"]
  //       }
  //     },
  //     allIds: [ "list1", "list2" ]
  //   }
  // }
}

 const store = configureStore({
  reducer: {
    cards: cardReducer,
    lists: listReducer
  },
  preloadedState: persistedState
});

store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));

export default store;
