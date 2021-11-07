import Automerge from 'automerge'
// eslint-disable-next-line
import { makeReducerAction, iterateReducers, removeFromList, makeTitleReducer, makeSimpleReducer } from "../../redux-utils.js";
import { nanoid } from 'nanoid'

const changeTitleObj = makeTitleReducer("board", "boards");

const newBoardObj = makeReducerAction("board/new", function(state, payload) {
  return Automerge.change(state, doc => {
    doc.boards.byId[payload.boardId] = {
      id: payload.boardId,
      title: "New Board",
      lists: []
    }
    doc.boards.allIds.push(payload.boardId);
  })
});

const removeBoardObj = makeReducerAction("board/remove", function(state, payload) {
   return Automerge.change(state, doc => {
    delete doc.boards.byId[payload.board];
    removeFromList(doc.boards.allIds, payload.board)
   });
});

const removeListReducer = makeSimpleReducer("list/remove", (state, payload) => {
  return Automerge.change(state, (doc) => {
    removeFromList(doc.boards.byId[payload.boardId].lists, payload.listId);
  });
});

const addListReducer = makeSimpleReducer("list/new", (state, payload) => {
  return Automerge.change(state, (doc) => {
    doc.boards.byId[payload.boardId].lists.push(payload.listId);
  });
});

//TODO: Refactor <RemoveItem> to use the new thunks and get rid of the ID object
const removeBoardThunk = (idObj) => {
  return (dispatch, getState) => {
    const boardId = idObj.id;
    const state = getState();
    const lists = state.boards.byId[boardId].lists;
    const cards = lists.flatMap((listId) => state.lists.byId[listId].cards);
    dispatch(removeBoardObj.action({
      board: boardId,
      lists: lists,
      cards: cards
    }))
  }
}

const newBoardThunk = () => {
  return (dispatch, getState) => {
    const boardId = nanoid();    
    dispatch(newBoardObj.action({ boardId }))
  }
}

export const changeTitle = changeTitleObj.action;
export const newBoard = newBoardThunk;
export const removeBoard = removeBoardThunk;
export default iterateReducers([
  changeTitleObj.reducer, newBoardObj.reducer, removeBoardObj.reducer,
  removeListReducer, addListReducer]);
