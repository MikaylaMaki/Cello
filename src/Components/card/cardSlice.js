import Automerge from 'automerge'
import { makeSimpleReducer, makeReducerAction, iterateReducers, removeFromList, makeTitleReducer } from "../../redux-utils.js";
import { nanoid } from 'nanoid'

const changeTitleObj = makeTitleReducer("card", "cards");

const addCardObj = makeReducerAction("card/new", function(state, payload) {
  return Automerge.change(state, doc => {
    doc.cards.byId[payload.cardId] = {
      id: payload.cardId,
      title: "New card",
    }
    doc.cards.allIds.push(payload.cardId);
  });
});

const removeCardObj = makeReducerAction("card/remove", function(state, payload) {
  return Automerge.change(state, doc => {
    delete doc.cards.byId[payload.cardId];
    removeFromList(doc.cards.allIds, payload.cardId)
  })
});

const removeBoardReducer = makeSimpleReducer("board/remove", (state, payload) => {
  return Automerge.change(state, doc => {
    payload.cards.forEach((cardId) => {
      delete doc.cards.byId[cardId];
      removeFromList(doc.cards.allIds, cardId)
    });
  });
});

const removeListReducer = makeSimpleReducer("list/remove", (state, payload) => {
  return Automerge.change(state, doc => {
    payload.cards.forEach((cardId) => {
      delete doc.cards.byId[cardId];
      removeFromList(doc.cards.allIds, cardId)
    });
  });
});


const removeCardThunk = (idObj) => (dispatch, getState) => {
  const state = getState();
  const cardId = idObj.id.cardId;
  const [ listId ] = state.lists.allIds.filter(
    (listId) => state.lists.byId[listId].cards.includes(cardId)
  );
  dispatch(removeCardObj.action({cardId, listId}));
};

const newCardThunk = (listId) => (dispatch, getState) => {
  const cardId = nanoid();
  dispatch(addCardObj.action({cardId, listId}));
}

export const changeTitle = changeTitleObj.action;
export const newCard = newCardThunk;
export const removeCard = removeCardThunk;
export default iterateReducers([changeTitleObj.reducer, addCardObj.reducer, removeCardObj.reducer, removeBoardReducer, removeListReducer]);
