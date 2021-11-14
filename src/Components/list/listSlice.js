import Automerge from 'automerge'
import { makeSimpleReducer, makeReducerAction, iterateReducers, removeFromList, makeTitleReducer } from "../../redux-utils.js";
import { nanoid } from 'nanoid'
// import { arrayMove } from '../../utils.js';

const changeTitleObj = makeTitleReducer("list", "lists");

const newListObj = makeReducerAction("list/new", function(state, payload) {
  return Automerge.change(state, doc => {
    doc.lists.byId[payload.list] = {
      id: payload.list,
      title: "New List",
      cards: []
    }
    doc.lists.allIds.push(payload.list);
  });
});

const removeListObj = makeReducerAction("list/remove", function(state, payload) {
  return Automerge.change(state, (doc) => {
    delete doc.lists.byId[payload.list];
    removeFromList(doc.lists.allIds, payload.list);
  });
});

const removeBoardReducer = makeSimpleReducer("board/remove", (state, payload) => {
  return Automerge.change(state, doc => {
    payload.lists.forEach((list) => {
      delete doc.lists.byId[list];
      removeFromList(doc.lists.allIds, list)
    });
  });
});

const removeCardReducer = makeSimpleReducer("card/remove", (state, payload) => {
  return Automerge.change(state, (doc) => {
    removeFromList(doc.lists.byId[payload.list].cards, payload.card);
  });
})

const addCardReducer = makeSimpleReducer("card/new", (state, payload) => {
  return Automerge.change(state, (doc) => {
    doc.lists.byId[payload.list].cards.push(payload.card);
  });
});

const moveCardReducer = makeSimpleReducer("card/move", (state, payload) => {
  //payload is of {card, list, toIndex, toList}
  return Automerge.change(state, doc => {
    // let cardIndex = doc.lists.byId[payload.list].cards.indexOf(payload.card);
    // doc.lists.byId[payload.list].cards.deleteAt(cardIndex);
    removeFromList(doc.lists.byId[payload.list].cards, payload.card);
  }); 
  // return  Automerge.change(state, doc => {
    // let cardIndex = doc.lists.byId[payload.list].cards.indexOf(payload.card);
    // doc.lists.byId[payload.list].cards.deleteAt(cardIndex);
    // doc.lists.byId[payload.list].cards.insertAt(payload.toIndex, payload.card);
  // }); 

  // console.dir({"listId": payload.list, "lists": state.lists});
  // return Automerge.change(state, doc => {
  //   let cardIndex = doc.lists.byId[payload.list].cards.indexOf(payload.card);
  //   if(payload.list === payload.toList) {
  //     delete doc.lists.byId[payload.list].cards[cardIndex];
  //     // arrayMove(doc.lists.byId[payload.list].cards, cardIndex, payload.toIndex);
  //   }// else {
      
      // doc.lists.byId[payload.toList].cards.insertAt(payload.toIndex, payload.card);
    // }
  // });
});

const removeListThunk = (list) => (dispatch, getState) => {
  const state = getState();
  const [ board ] = state.boards.allIds.filter(
      (board) => state.boards.byId[board].lists.includes(list)
  );
  const cards = state.lists.byId[list].cards;

  dispatch(removeListObj.action({list, board, cards}));
};

const newListThunk = (board) => (dispatch, getState) => {
  let list = nanoid();
  dispatch(newListObj.action({board, list}));
};

export const selectListIds = (boardId) => (state) => {
  return state.boards.byId[boardId].lists;
}

export const selectList = (listId) => (state) => {
  return state.lists.byId[listId];
}

export const changeTitle = changeTitleObj.action;
export const newList = newListThunk;
export const removeList = removeListThunk;
export default iterateReducers([
  changeTitleObj.reducer, newListObj.reducer, removeListObj.reducer,
  removeBoardReducer, removeCardReducer, addCardReducer, moveCardReducer
]);
