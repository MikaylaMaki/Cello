import { CelloList } from "./CelloList";
import { NewItem } from "../utils/NewItem";
import { newList, selectListIds } from "./listSlice";
import { useSelector } from "react-redux";
// import { arrayMove } from "../../utils";
// import { useState, useEffect } from "react";
import { selectCardsByLists } from "../card/cardSlice"
// import { selectBoardsInclude } from "../board/boardSlice"
// import { useStore } from 'react-redux'

export function Lists(props) {
  let listIds = useSelector(selectListIds(props.boardId));
  // let store = useStore();
  let /*[*/cardsByList/*, setCardsByList] */=/* useState(*/useSelector(selectCardsByLists(props.boardId))/*)*/;
  
  // useEffect(() => {
  //   let unsub = store.subscribe(() => {
  //     let state = store.getState();
  //     if(selectBoardsInclude(props.boardId)(state)) {
  //       setCardsByList(selectCardsByLists(props.boardId)(state));
  //     } else {
  //       setCardsByList({});
  //     }
  //   });
  //   return () => {
  //     unsub();
  //   }
  // }, [props.boardId, store]);

  // //TODO extremely broken, reverting back to same list move semantics
  // const moveBetweenLists = (fromList, fromCard, toIndex, toList) => setCardsByList((prevCardsByList) => {
  //   let fromCardIndex = prevCardsByList[fromList].indexOf(fromCard); //TODO move this index to useSortable()
  //   // if(fromCardIndex === -1) {
  //     // return prevCardsByList;
  //   // }
  //   let newCardsByList = {...prevCardsByList}
  //   if(fromList === toList) {
  //     arrayMove(newCardsByList[fromList], fromCardIndex, toIndex);
  //     return newCardsByList;  
  //   } //else {
  //     // let cardId = prevCardsByList[fromList][fromCardIndex];      
  //     // newCardsByList[fromList].splice(fromCardIndex, 1);   
  //     // newCardsByList[toList].splice(toIndex, 0, cardId);
  //     // return newCardsByList;
  //   // }
  // });

  let listEls = listIds.map((listId) => {
    return <CelloList key={listId} listId={listId} cardIds={cardsByList[listId]} /*moveCard={moveBetweenLists}*/ />
  })

  return (
    <div style={{  display: "flex", alignItems: "flex-start"}} className="list-container">
      {listEls}
      <NewItem action={newList} actionArg={props.boardId} />
    </div>
  )
}