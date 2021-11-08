import { RemoveItem } from '../utils/RemoveItem';
import { NewItem } from '../utils/NewItem';
import { Card } from '../card/Card';
import { useSelector } from 'react-redux'
import { changeTitle, removeList } from './listSlice'
import { SimpleTextProperty } from '../utils/SimpleTextProperty'
import { newCard } from '../card/cardSlice'
// import { useDrop } from 'react-dnd'
import "./list.css"
import { useState } from 'react';

const arrayMove = (array, from, to) => {
  array.splice(to, 0, array.splice(from, 1)[0]);
};

export function CelloList(props) {
  let cards = useSelector((state) => {return state.cards});
  const [ourCards, setOurCards] = useState(props.list.cards);

  //TODO currently experiencing the memory bug we had with boards. Using in-memory useState() objects
  //here, instead of the proper IDs-and-queries that fixed it last time. Too tired to implement the fix tho....
  const move = (listId, cardId, index) => {
    let arrayCopy = [...ourCards];
    let cardIndex = arrayCopy.indexOf(cardId);
    arrayMove(arrayCopy, cardIndex, index);
    setOurCards(arrayCopy);
  }


  let cardEls = ourCards.map((cardId, i) => {
    let card = cards.byId[cardId];
    return (
      <Card key={cardId} card={card} list={props.list.id} move={move} listId={props.list.id} index={i} />
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
