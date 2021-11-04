import cardReducer from './components/card/cardSlice'
import listReducer from './components/list/listSlice'
import boardReducer from './components/board/boardSlice'
import { createStore } from 'redux'
import {loadState, saveState, blankState, loadReducer} from './storage'
import throttle from 'lodash/throttle'
import { iterateReducers } from './redux-utils.js'


const store = createStore(
  iterateReducers([loadReducer, cardReducer, listReducer, boardReducer]),
  blankState(),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

loadState(store.dispatch);

store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));

export default store;
