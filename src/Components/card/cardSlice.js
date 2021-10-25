import { createSlice } from "@reduxjs/toolkit"

const cardSlice = createSlice({
  name: 'cards',
  initialState: {
    byIds: {},
    allIds: []
  },
  reducers: {
    changeTitle(state, action) {
      if ("id" in action.payload && "value" in action.payload) {
        if (action.payload.id in state.byId) {
          state.byId[action.payload.id].cardTitle = action.payload.value;
        } else {
          console.error("No card with ID " + action.payload.id + " found");
        }
      } else {
        console.error("Action is malformed");
      }
      return state;
    }
  }
});

export const { changeTitle } = cardSlice.actions;
export default cardSlice.reducer;
