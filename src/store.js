import cardReducer from './components/card/cardSlice'
import listReducer from './components/list/listSlice'
import { createStore } from 'redux'
import {loadState, saveState, blankState, loadReducer} from './storage'
import throttle from 'lodash/throttle'


const store = createStore(
  (old, action) => {
    old = loadReducer(old, action);
    old = cardReducer(old, action);
    old = listReducer(old, action);
    return old;
  },
  blankState(),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

console.dir(blankState());

loadState(store.dispatch);

store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));

export default store;
