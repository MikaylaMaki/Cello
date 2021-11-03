import Automerge from 'automerge'
import { makeReducer, iterateReducers, removeFromList } from "../../redux-utils.js";
import { nanoid } from 'nanoid'

const changeTitleObj = makeReducer("list/changeTitle", function(state, payload) {
  if ("id" in payload && "value" in payload) {
    if (payload.id in state.lists.byId) {
      return Automerge.change(state, doc => {
        doc.lists.byId[payload.id].listTitle = payload.value;
      })
    } else {
      console.error("No list with ID " + payload.id + " found");
    }
  } else {
    console.error("list/changeTitle action is malformed");
  }
  return state;
});

const newListObj = makeReducer("list/new", function(state, payload) {
  return Automerge.change(state, doc => {
    let listId = nanoid();
    doc.lists.byId[listId] = {
      id: listId,
      listTitle: "New List",
      cards: []
    }
    doc.lists.allIds.push(listId);
  })
});

const removeListObj = makeReducer("list/remove", function(state, payload) {
  if ("id" in payload) {
    if (payload.id in state.lists.byId) {
      return Automerge.change(state, doc => {
        //delete byId object
        delete doc.lists.byId[payload.id];

        //remove allIds entry
        removeFromList(doc.lists.allIds, payload.id);
      })
    } else {
      console.error("No list with ID " + payload.id + " found");
    }
  } else {
    console.error("list/remove action is malformed");
  }
  return state;
});


export const changeTitle = changeTitleObj.action;
export const newList = newListObj.action;
export const removeList = removeListObj.action;
export default iterateReducers([changeTitleObj.reducer, newListObj.reducer, removeListObj.reducer]);
