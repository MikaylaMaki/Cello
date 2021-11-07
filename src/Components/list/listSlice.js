import Automerge from 'automerge'
import { makeSimpleReducer, makeReducerAction, iterateReducers, removeFromList, makeTitleReducer } from "../../redux-utils.js";
import { nanoid } from 'nanoid'

const changeTitleObj = makeTitleReducer("list", "lists");

const newListObj = makeReducerAction("list/new", function(state, payload) {
  return Automerge.change(state, doc => {
    doc.lists.byId[payload.listId] = {
      id: payload.listId,
      title: "New List",
      cards: []
    }
    doc.lists.allIds.push(payload.listId);
  });
});

const removeListObj = makeReducerAction("list/remove", function(state, payload) {
  return Automerge.change(state, (doc) => {
    delete doc.lists.byId[payload.listId];
    removeFromList(doc.lists.allIds, payload.listId);
  });
});

const removeBoardReducer = makeSimpleReducer("board/remove", (state, payload) => {
  return Automerge.change(state, doc => {
    payload.lists.forEach((listId) => {
      delete doc.lists.byId[listId];
      removeFromList(doc.lists.allIds, listId)
    });
  });
});

const removeCardReducer = makeSimpleReducer("card/remove", (state, payload) => {
  return Automerge.change(state, (doc) => {
    removeFromList(doc.lists.byId[payload.listId].cards, payload.cardId);
  });
})

const addCardReducer = makeSimpleReducer("card/new", (state, payload) => {
  return Automerge.change(state, (doc) => {
    doc.lists.byId[payload.listId].cards.push(payload.cardId);
  });
});

const removeListThunk = (idObj) => (dispatch, getState) => {
  const state = getState();
  const listId = idObj.id.listId;
  const [ boardId ] = state.boards.allIds.filter(
      (boardId) => state.boards.byId[boardId].lists.includes(listId)
  );
  const cards = state.lists.byId[listId].cards;

  dispatch(removeListObj.action({listId, boardId, cards}));
};

const newListThunk = (boardId) => (dispatch, getState) => {
  let listId = nanoid();
  dispatch(newListObj.action({boardId, listId}));
};



export const changeTitle = changeTitleObj.action;
export const newList = newListThunk;
export const removeList = removeListThunk;
export default iterateReducers([
  changeTitleObj.reducer, newListObj.reducer, removeListObj.reducer,
  removeBoardReducer, removeCardReducer, addCardReducer
]);
