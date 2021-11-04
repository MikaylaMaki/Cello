import Automerge from 'automerge'
import { makeReducer, iterateReducers, removeFromList, makeTitleReducer } from "../../redux-utils.js";
import { nanoid } from 'nanoid'

const changeTitleObj = makeTitleReducer("card", "cards");

const addCardObj = makeReducer("card/new", function(state, payload) {
  if ("listId" in payload) {
    if(state.lists.allIds.includes(payload.listId )) {
      return Automerge.change(state, doc => {
        let cardId = nanoid();
        doc.cards.byId[cardId] = {
          id: cardId,
          title: "New card",
        }
        doc.cards.allIds.push(cardId);

        doc.lists.byId[payload.listId].cards.push(cardId);
      })
    } else {
      console.error("Could not find list with ID: " + payload.listId);
    }
  } else {
    console.error("card/new action is malformed");
  }
});

const removeCardObj = makeReducer("card/remove", function(state, payload) {
  if ("id" in payload && "cardId" in payload.id && "listId" in payload.id) {
    if (payload.id.cardId in state.cards.byId) {
      return Automerge.change(state, doc => {
        //delete byId object
        delete doc.cards.byId[payload.id.cardId];

        //remove allIds entry
        removeFromList(doc.cards.allIds, payload.id.cardId)

        //remove list.cards entry
        removeFromList(doc.lists.byId[payload.id.listId].cards, payload.id.cardId);
      })
    } else {
      console.error("No card with ID " + JSON.stringify(payload.id) + " found");
    }
  } else {
    console.error("card/remove action is malformed");
  }
  return state;
});

export const changeTitle = changeTitleObj.action;
export const newCard = addCardObj.action;
export const removeCard = removeCardObj.action;
export default iterateReducers([changeTitleObj.reducer, addCardObj.reducer, removeCardObj.reducer]);
