export const makeReducer = (actionName, reducerFunction) => {
  return {
    reducer: function(state, action) {
      if(action.type === actionName) {
        state = reducerFunction(state, action.payload);
      }
      return state;
    },
    action: function(data) {
      if(typeof data !== "object" && typeof data !== "undefined") {
        console.error("Action data should be in an object: " + actionName);
        data = {data: data};
      }
      return { type: actionName, payload: data}
    }
  }
}

export const iterateReducers = (reducers) => {
  return function(state, action) {
    reducers.forEach((reducer, i) => {
      state = reducer(state, action);
    });
    return state;
  }
};

/// Can only be called from an automerge proxy context
export const removeFromList = (list, item) => {
  let index = -1;
  for (let i = 0; i < list.length; i++) {
    if(list[i] === item) {
      index = i;
      break;
    }
  }
  if(index >= 0) {
    list.deleteAt(index);
    return true;
  } else {
    console.error("item not found");
    return false;
  }
}
