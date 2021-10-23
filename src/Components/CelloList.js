import React from 'react';
import { Card } from './Card';
import { EditableText } from './EditableText'

export function CelloList(props) {
    let cardEls = props.list.cards.map((card) => {
      return (
        <Card key={card.cardTitle} card={card} />
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
          <EditableText value={props.list.listTitle} onChange={null} />
        </span>
          {cardEls}
      </div>
    );
}
