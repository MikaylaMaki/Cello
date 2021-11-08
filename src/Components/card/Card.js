import { SimpleTextProperty } from '../utils/SimpleTextProperty'
import { changeTitle, removeCard, moveCard } from './cardSlice'
import { RemoveItem } from '../utils/RemoveItem'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useDrag } from 'react-dnd'
import { useDrop } from 'react-dnd'
// import { useState } from 'react'
import "./card.css"

export function Card(props) {
  let ref = useRef(null);
  let dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "CARD",
    item: () => {
      return { cardId: props.card.id,  listId: props.listId, index: props.index};
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  const [, drop] = useDrop(() => ({
      accept: "CARD",
      drop(item, monitor) {
        dispatch(moveCard(item.cardId, item.listId, item.index));
      },
      hover(item, monitor) { //From: https://react-dnd.github.io/react-dnd/examples/sortable/simple
        if (!ref.current) {
            return;
        }
        const dragIndex = item.index;
        const hoverIndex = props.index;
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }
        // Determine rectangle on screen
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // Determine mouse position
        const clientOffset = monitor.getClientOffset();
        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }
        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }
        // Time to actually perform the action
        props.move(item.listId, item.cardId, hoverIndex);
        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        item.index = hoverIndex;
    }
    }),
    [props.index]
  );
  drag(drop(ref));

  return (
    <div ref={ref} className="card" style={{opacity: isDragging ? 0.4 : 1}}>
      <SimpleTextProperty action={ changeTitle } prop={ props.card.title } id={ props.card.id } />
      <RemoveItem action={removeCard} id={props.card.id} />
      {/* <span onClick={e => props.move(props.card.id, props.index - 1)}>Up</span><span onClick={e => props.move(props.card.id, props.index + 1)}>Down</span> */}
    </div>
  )
}
