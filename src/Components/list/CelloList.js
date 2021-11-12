import { RemoveItem } from '../utils/RemoveItem';
import { NewItem } from '../utils/NewItem';
import { Card } from '../card/Card';
import { useSelector } from 'react-redux'
import { changeTitle, removeList, selectList } from './listSlice'
import { SimpleTextProperty } from '../utils/SimpleTextProperty'
import { newCard } from '../card/cardSlice'
// import { useDrop } from 'react-dnd'
import "./list.css"
// import { useEffect, useState } from 'react';
// import { arrayMove, arraysEqual } from '../../utils'

export function CelloList(props) {
  // let store = useStore();
  let list = useSelector(selectList(props.listId));
  // console.dir([list, props.listId]);
  // const [ourCards, setOurCards] = useState(props.list.cards);

  //TODO: Make boards DnD-able
  //TODO: Make lists DnD-able
  
  // useEffect(() => store.subscribe(() => {
  //   let state = store.getState();
  //   if(state.lists.byId.hasOwnProperty(props.list.id)) {
  //     if(!arraysEqual(state.lists.byId[props.list.id].cards, ourCards)) {
  //       setOurCards(state.lists.byId[props.list.id].cards);
  //     }
  //   } else {
  //     setOurCards(null);
  //   }
  // }), [ourCards, props.list.id, store])

  // //Signature is supposed to mean 'From list1.card, move to list2.index', rewrite signature and move this up
  // const move = (cardListId, cardId, index, targetListId) => setOurCards((prevOurCards) => {
  //   if(cardListId === props.list.id) {
  //     let arrayCopy = [...prevOurCards];
  //     let cardIndex = arrayCopy.indexOf(cardId);
  //     arrayMove(arrayCopy, cardIndex, index);
  //     return arrayCopy;
  //   }
  // })

  let cardEls = props.cardIds.map((cardId, i) => {
    return (
      <Card key={cardId} moveCard={props.moveCard} cardId={cardId} listId={list.id} index={i} />
    )
  })

  return (
    <div className="list">
      <span className="list-title">
        <SimpleTextProperty prop={list.title} id={list.id} action={changeTitle} />
        <RemoveItem action={removeList} id={list.id} />
      </span>
      {cardEls}
      <NewItem action={newCard} actionArg={list.id} />
    </div>
  );
}
