import { CelloList } from "./CelloList";
import { NewItem } from "../utils/NewItem";
import { newList } from "./listSlice";
import { arrayMove, arraysEqual } from "../../utils";
import { useState, useEffect } from "react";
import { useStore } from "react-redux";

export function Lists(props) {
  let store = useStore();
  let [lists, setLists] = useState(props.lists);

  const moveBetweenLists = (fromList, fromCard, toIndex, toList) => setLists((prevLists) => {
    console.dir([fromList, fromCard, toIndex, toList]);
    let fromListIndex = lists.map((list) => list.id).indexOf(fromList);
    let fromCardIndex = prevLists[fromListIndex].cards.indexOf(fromCard); //TODO move this index to useSortable()
    if(fromList === toList) {
      arrayMove(prevLists[fromListIndex].cards, fromCardIndex, toIndex);
      return prevLists;  
    } else {
      let toListIndex = lists.map((list) => list.id).indexOf(toList);
      let cardObj = prevLists[fromListIndex].cards[fromCardIndex];
      prevLists[fromListIndex].cards.splice(fromCardIndex, 1);
      prevLists[toListIndex].cards.splice(toIndex, 0, cardObj);
      return prevLists;
    }
  });

  useEffect(() => store.subscribe(() => {
    let state = store.getState();
    setLists(state.lists.allIds.map((listId) => state.lists.byId[listId]));
    // let listIds = lists.map((list) => list.id);
    // if(!arraysEqual(state.lists.allIds, listIds)) {
    //   setLists(state.lists.allIds.map((listId) => state.lists.byId[listId]));
    // } else {
    //   lists.every(list => {
    //     if(!arraysEqual(list.cards, state.lists.byId[list.id].cards)) {
          
    //       return false;
    //     }
    //     return true
    //   });
    // }
  }));

    let listEls = lists.map((list) => {
      return <CelloList key={list.id} list={list} moveFunc={moveBetweenLists} />
    })

    return (
      <div style={{  display: "flex", alignItems: "flex-start"}} className="list-container">
        {listEls}
        <NewItem action={newList} actionArg={props.boardId} />
    </div>
    )
}