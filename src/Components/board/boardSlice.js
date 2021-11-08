import Automerge from 'automerge'
// eslint-disable-next-line
import { makeReducerAction, iterateReducers, removeFromList, makeTitleReducer, makeSimpleReducer } from "../../redux-utils.js";
import { nanoid } from 'nanoid'

const changeTitleObj = makeTitleReducer("board", "boards");

const newBoardObj = makeReducerAction("board/new", (state, payload) => {
  return Automerge.change(state, doc => {
    doc.boards.byId[payload.board] = {
      id: payload.board,
      title: "New Board",
      lists: []
    }
    doc.boards.allIds.push(payload.board);
  })
});

const removeBoardObj = makeReducerAction("board/remove", (state, payload) => {
   return Automerge.change(state, doc => {
    delete doc.boards.byId[payload.board];
    removeFromList(doc.boards.allIds, payload.board)
   });
});

const removeListReducer = makeSimpleReducer("list/remove", (state, payload) => {
  return Automerge.change(state, (doc) => {
    removeFromList(doc.boards.byId[payload.board].lists, payload.list);
  });
});

const addListReducer = makeSimpleReducer("list/new", (state, payload) => {
  return Automerge.change(state, (doc) => {
    doc.boards.byId[payload.board].lists.push(payload.list);
  });
});

const removeBoardThunk = (board) => {
  return (dispatch, getState) => {
    const state = getState();
    const lists = state.boards.byId[board].lists;
    const cards = lists.flatMap((list) => state.lists.byId[list].cards);
    dispatch(removeBoardObj.action({board, lists, cards }))
  }
}

const newBoardThunk = () => {
  return (dispatch, getState) => {
    const board = nanoid();    
    dispatch(newBoardObj.action({ board }))
  }
}

export const changeTitle = changeTitleObj.action;
export const newBoard = newBoardThunk;
export const removeBoard = removeBoardThunk;
export default iterateReducers([
  changeTitleObj.reducer, newBoardObj.reducer, removeBoardObj.reducer,
  removeListReducer, addListReducer]);
