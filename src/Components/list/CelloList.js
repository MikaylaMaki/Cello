import { RemoveItem } from '../utils/RemoveItem';
import { NewItem } from '../utils/NewItem';
import { Card } from '../card/Card';
import { useSelector/*, useStore */} from 'react-redux'
import { changeTitle, removeList } from './listSlice'
import { SimpleTextProperty } from '../utils/SimpleTextProperty'
import { newCard } from '../card/cardSlice'
// import { useDrop } from 'react-dnd'
import "./list.css"
// import { useEffect, useState } from 'react';
// import { arrayMove, arraysEqual } from '../../utils'

export function CelloList(props) {
  // let store = useStore();
  let cards = useSelector((state) => {return state.cards});
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

  let cardEls = props.list.cards.map((cardId, i) => {
    let card = cards.byId[cardId];
    return (
      <Card key={cardId} card={card} list={props.list.id} move={props.moveFunc} listId={props.list.id} index={i} />
    )
  })

  return (
    <div className="list">
      <span className="list-title">
        <SimpleTextProperty prop={props.list.title} id={props.list.id} action={changeTitle} />
        <RemoveItem action={removeList} id={props.list.id} />
      </span>
      {cardEls}
      <NewItem action={newCard} actionArg={props.list.id} />
    </div>
  );
}
