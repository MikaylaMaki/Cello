import Automerge from 'automerge'
// eslint-disable-next-line
import { makeReducer, iterateReducers, removeFromList, makeTitleReducer } from "../../redux-utils.js";
import { nanoid } from 'nanoid'

const changeTitleObj = makeTitleReducer("board", "boards");

const newBoardObj = makeReducer("board/new", function(state, payload) {
  return Automerge.change(state, doc => {
    let boardId = nanoid();
    doc.boards.byId[boardId] = {
      id: boardId,
      title: "New Board",
      lists: []
    }
    doc.boards.allIds.push(boardId);
  })
});

const removeBoardObj = makeReducer("board/remove", function(state, payload) {
  if ("id" in payload) {
    if (payload.id in state.boards.byId) {
      return Automerge.change(state, doc => {
        //Remove lists and associated cards
        doc.boards.byId[payload.id].lists.forEach((listId, i) => {
          //remove card allIds
          doc.cards.allIds = doc.cards.allIds.filter(
            (cardId) => !doc.lists.byId[listId].cards.includes(cardId)
          );

          //remove card byIds
          doc.lists.byId[listId].cards.forEach((cardId, i) => {
            delete doc.cards.byId[cardId];
          });

          // remove list from allIds
          removeFromList(doc.lists.allIds, listId);
          //remove list from byIds
          delete doc.lists.byId[listId];
        });

        // delete byId object
        delete doc.boards.byId[payload.id];
        // remove allIds entry
        removeFromList(doc.boards.allIds, payload.id)
      })
    } else {
      console.error("No board with ID " + JSON.stringify(payload.id) + " found");
    }
  } else {
    console.error("board/remove action is malformed");
  }
  return state;
});

export const changeTitle = changeTitleObj.action;
export const newBoard = newBoardObj.action;
export const removeBoard = removeBoardObj.action;
export default iterateReducers([changeTitleObj.reducer, newBoardObj.reducer, removeBoardObj.reducer]);
