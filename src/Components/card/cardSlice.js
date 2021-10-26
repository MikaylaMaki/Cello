import Automerge from 'automerge'

export const changeTitle = (data) => {
  return { type: "card/changeTitle", payload: data}
}

const changeTitleR = (state, action) => {
  if(action.type === "card/changeTitle") {
    if ("id" in action.payload && "value" in action.payload) {
      if (action.payload.id in state.cards.byId) {
        return Automerge.change(state, doc => {
          doc.cards.byId[action.payload.id].cardTitle = action.payload.value;
        })
      } else {
        console.error("No card with ID " + action.payload.id + " found");
      }
    } else {
      console.error("Action is malformed");
    }
  }
  return state;
}

export default changeTitleR;
