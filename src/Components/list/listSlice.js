import Automerge from 'automerge'

export const changeTitle = (data) => {
  return { type: "list/changeTitle", payload: data}
}

const changeTitleR = (state, action) => {
  if(action.type === "list/changeTitle") {
    if ("id" in action.payload && "value" in action.payload) {
      if (action.payload.id in state.lists.byId) {
        return Automerge.change(state, doc => {
          doc.lists.byId[action.payload.id].listTitle = action.payload.value;
        })
      } else {
        console.error("No list with ID " + action.payload.id + " found");
      }
    } else {
      console.error("Action is malformed: " + action);
    }
  }
  return state;
};

export default changeTitleR;
