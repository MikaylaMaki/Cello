import React from 'react';
import { RemoveItem } from '../utils/RemoveItem';
import { Card } from '../card/Card';
import { NewCard } from '../card/NewCard';
import { useSelector } from 'react-redux'
import { changeTitle, removeList } from './listSlice'
import { SimpleTextProperty } from '../utils/SimpleTextProperty'
import "./list.css"

export function CelloList(props) {
  let cards = useSelector((state) => {return state.cards});

  let cardEls = props.list.cards.map((cardId) => {
    let card = cards.byId[cardId];
    return (
      <Card key={cardId} card={card} listId={props.list.id} />
    )
  })

  return (
    <div className="list">
      <span className="list-title">
        <SimpleTextProperty prop={props.list.title} id={props.list.id} action={changeTitle} />
        <RemoveItem action={removeList} id={{listId: props.list.id, boardId: props.boardId}} />
      </span>
        {cardEls}
        <NewCard listId={props.list.id} />
    </div>
  );
}
