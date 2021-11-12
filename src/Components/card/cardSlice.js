import Automerge from 'automerge'
import { makeSimpleReducer, makeReducerAction, iterateReducers, removeFromList, makeTitleReducer, makeSimpleAction } from "../../redux-utils.js";
import { nanoid } from 'nanoid'

const changeTitleObj = makeTitleReducer("card", "cards");

const addCardObj = makeReducerAction("card/new", (state, payload) => {
  return Automerge.change(state, doc => {
    doc.cards.byId[payload.card] = {
      id: payload.card,
      title: "New card",
    }
    doc.cards.allIds.push(payload.card);
  });
});

const removeCardObj = makeReducerAction("card/remove", (state, payload) => {
  return Automerge.change(state, doc => {
    delete doc.cards.byId[payload.card];
    removeFromList(doc.cards.allIds, payload.card)
  })
});

const removeBoardReducer = makeSimpleReducer("board/remove", (state, payload) => {
  return Automerge.change(state, doc => {
    payload.cards.forEach((card) => {
      delete doc.cards.byId[card];
      removeFromList(doc.cards.allIds, card)
    });
  });
});

const removeListReducer = makeSimpleReducer("list/remove", (state, payload) => {
  return Automerge.change(state, doc => {
    payload.cards.forEach((card) => {
      delete doc.cards.byId[card];
    });
  });
});

//Don't need to implement the reducers as the card doesn't actually have it's positional data
const moveCardAction = makeSimpleAction("card/move"); 

const removeCardThunk = (card) => (dispatch, getState) => {
  const state = getState();
  const [ list ] = state.lists.allIds.filter(
    (list) => state.lists.byId[list].cards.includes(card)
  );
  dispatch(removeCardObj.action({card, list}));
};

const newCardThunk = (list) => (dispatch, getState) => {
  const card = nanoid();
  dispatch(addCardObj.action({card, list}));
}

const moveCardThunk = (card, list, toIndex, toList) => (dispatch, getState) => {
  dispatch(moveCardAction({card, list, toIndex, toList}));
}

export const selectCardIds = (listId) => (state) => {
  return state.lists.byId[listId].cards;
};

export const selectCard = (cardId) => (state) => {
  return state.cards.byId[cardId];
};

export const selectCardsByLists = (boardId) => (state) => {
  let s = state.boards.byId[boardId].lists.reduce((obj, listId) => {
    obj[listId] = state.lists.byId[listId].cards;
    return obj;
  }, {});
  return s;
}

export const changeTitle = changeTitleObj.action;
export const newCard = newCardThunk;
export const removeCard = removeCardThunk;
export const moveCard = moveCardThunk;
export default iterateReducers([changeTitleObj.reducer, addCardObj.reducer, removeCardObj.reducer, removeBoardReducer, removeListReducer]);
