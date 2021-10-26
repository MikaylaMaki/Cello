import React from 'react';
import { Card } from '../card/Card';
import { EditableText } from '../EditableText'
import { useSelector, useDispatch } from 'react-redux'
import { changeTitle } from './listSlice'


export function CelloList(props) {
  let cards = useSelector((state) => {return state.cards});
  const dispatch = useDispatch();

  let cardEls = props.list.cards.map((cardId) => {
    let card = cards.byId[cardId];
    return (
      <Card key={cardId} card={card} />
    )
  })
  
  return (
    <div className="list"
         style={{
           minWidth: "3in",
           margin: "1em",
           border: "1px solid purple"
         }}>
      <span className="list-title"
            style={{
              padding: ".25em",
              margin: ".25em",
              display: "inline-block",
              marginBottom: 0,
              paddingBottom: 0,
              paddingLeft: ".5em",
            }}>
        <EditableText value={props.list.listTitle} onChange={(e) => {dispatch(changeTitle({id: props.list.id, value: e.target.value}))}} />
      </span>
        {cardEls}
    </div>
  );
}
