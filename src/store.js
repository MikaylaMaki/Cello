import { createStore } from 'redux'
import produce from 'immer';

export default createStore(
  (old, action) => {
    return produce(old, draft => {
      if(action.type === "change_text") {
        draft.lists[0].cards[0].cardTitle = "CHANGED!";
      }
      return draft;
    })},
  {
    lists: [
      {
        listTitle: "List title 1",
        cards: [
          {
            cardTitle: "Hello Cello 1!"
          },
        ]
      },
      {
        listTitle: "List title 2",
        cards: [
          {
            cardTitle: "Hello Cello 2!"
          },
          {
            cardTitle: "Hello Cello 3!"
          },
        ]
      },
    ]
});
