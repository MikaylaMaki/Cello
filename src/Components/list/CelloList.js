import React from 'react';
import { RemoveItem } from '../utils/RemoveItem';
import { Card } from '../card/Card';
import { NewCard } from '../card/NewCard';
import { EditableText } from '../utils/EditableText'
import { useSelector, useDispatch } from 'react-redux'
import { changeTitle, removeList } from './listSlice'
import "./list.css"

export function CelloList(props) {
  let cards = useSelector((state) => {return state.cards});
  const dispatch = useDispatch();

  let cardEls = props.list.cards.map((cardId) => {
    let card = cards.byId[cardId];
    return (
      <Card key={cardId} card={card} listId={props.list.id} />
    )
  })

  return (
    <div className="list">
      <span className="list-title">
        <EditableText value={props.list.listTitle} onChange={(e) => {dispatch(changeTitle({id: props.list.id, value: e.target.value}))}} />
        <RemoveItem action={removeList} id={props.list.id} />
      </span>
        {cardEls}
        <NewCard listId={props.list.id} />
    </div>
  );
}
