import Automerge from 'automerge'
import { makeReducer, iterateReducers, removeFromList, makeTitleReducer } from "../../redux-utils.js";
import { nanoid } from 'nanoid'

const changeTitleObj = makeTitleReducer("list", "lists");

const newListObj = makeReducer("list/new", function(state, payload) {
  if("boardId" in payload) {
    if(payload.boardId in state.boards.byId) {
      return Automerge.change(state, doc => {
        let listId = nanoid();
        doc.lists.byId[listId] = {
          id: listId,
          title: "New List",
          cards: []
        }
        doc.lists.allIds.push(listId);

        //Add to parent
        doc.boards.byId[payload.boardId].lists.push(listId);
      })
    } else {
      console.error("list/new: Could not find board with ID:" + payload.boardId);
    }
  } else {
    console.error("list/new action is malformed");
  }
});

const removeListObj = makeReducer("list/remove", function(state, payload) {
  if ("id" in payload && "boardId" in payload.id && "listId" in payload.id) {
    if (payload.id.listId in state.lists.byId && payload.id.boardId in state.boards.byId) {
      return Automerge.change(state, doc => {
        //remove card allIds
        doc.cards.allIds = doc.cards.allIds.filter(
          (cardId) => !doc.lists.byId[payload.id.listId].cards.includes(cardId)
        );

        //remove card byIds
        doc.lists.byId[payload.id.listId].cards.forEach((cardId, i) => {
          delete doc.cards.byId[cardId];
        });

        //delete byId object
        delete doc.lists.byId[payload.id.listId];

        //remove allIds entry
        removeFromList(doc.lists.allIds, payload.id.listId);

        //remove from board list
        removeFromList(doc.boards.byId[payload.id.boardId].lists, payload.id.listId);
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
