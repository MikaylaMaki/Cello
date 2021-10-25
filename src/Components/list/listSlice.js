import { createSlice } from '@reduxjs/toolkit'

const listSlice = createSlice({
  name: 'lists',
  initialState: {
    byIds: {},
    allIds: []
  },
  reducers: {
    changeTitle(state, action) {
      if ("id" in action.payload && "value" in action.payload) {
        if (action.payload.id in state.byId) {
          state.byId[action.payload.id].listTitle = action.payload.value;
        } else {
          console.error("No list with ID " + action.payload.id + " found");
        }
      } else {
        console.error("Action is malformed: " + action);
      }
      return state;
    }
  }
});

export const { changeTitle } = listSlice.actions;
export default listSlice.reducer;
