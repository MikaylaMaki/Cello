import { RemoveItem } from '../utils/RemoveItem';
import { NewItem } from '../utils/NewItem';
import { Card } from '../card/Card';
import { useSelector } from 'react-redux'
import { changeTitle, removeList } from './listSlice'
import { SimpleTextProperty } from '../utils/SimpleTextProperty'
import { newCard } from '../card/cardSlice'
import "./list.css"

export function CelloList(props) {
  let cards = useSelector((state) => {return state.cards});

  if(typeof props.list === "undefined") {
    return "BAD DATA IN BOARD";
  }
  let cardEls = props.list.cards.map((cardId) => {
    let card = cards.byId[cardId];
    return (
      <Card key={cardId} card={card} list={props.list.id} />
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
