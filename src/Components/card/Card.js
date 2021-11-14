import { SimpleTextProperty } from '../utils/SimpleTextProperty'
import { changeTitle, removeCard, selectCard/*, moveCard*/ } from './cardSlice'
import { RemoveItem } from '../utils/RemoveItem'
import { useRef } from 'react'
// import { useDispatch } from 'react-redux'
// import { useDrag, useDrop } from 'react-dnd'
import "./card.css"
import { useSelector } from 'react-redux'

export function Card(props) {
  let ref = useRef(null);
  let card = useSelector(selectCard(props.cardId));
  // let dispatch = useDispatch();
  
  // //TODO refactor this into a custom hook
  // const originalIndex = props.index;
  // const [{ isDragging }, drag] = useDrag(() => ({
  //   type: "CARD",
  //   item: () => {
  //     return { cardId: card.id,  listId: props.listId, index: props.index, originalIndex: originalIndex};
  //   },
  //   collect: (monitor) => ({
  //     isDragging: !!monitor.isDragging()
  //   }),
  //   end: (item, monitor) => {
  //     if(!monitor.didDrop()) {
  //       props.moveCard(item.listId, item.cardId, item.originalIndex, props.listId);
  //     }
  //   }
  // }), [originalIndex, card]);

  // const [, drop] = useDrop(() => ({
  //     accept: "CARD",
  //     drop(item, monitor) {
  //       dispatch(moveCard(item.cardId, item.listId, props.index, props.listId));
  //     },
  //     hover(item, monitor) { //From: https://react-dnd.github.io/react-dnd/examples/sortable/simple
  //       if (!ref.current) {
  //           return;
  //       }
  //       const dragIndex = item.index;
  //       const hoverIndex = props.index;
  //       const hoverList = props.listId;
  //       // Don't replace items with themselves
  //       if (dragIndex === hoverIndex) {
  //           return;
  //       }
  //       //TODO: Refine the UX of this algorithm. Past 50% is too much, more reasonably is mouse past the 
  //       //20% mark on either side (probably)

  //       // Determine rectangle on screen
  //       const hoverBoundingRect = ref.current?.getBoundingClientRect();
  //       // Get vertical middle
  //       const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
  //       // Determine mouse position
  //       const clientOffset = monitor.getClientOffset();
  //       // Get pixels to the top
  //       const hoverClientY = clientOffset.y - hoverBoundingRect.top;
  //       // Only perform the move when the mouse has crossed half of the items height
  //       // When dragging downwards, only move when the cursor is below 50%
  //       // When dragging upwards, only move when the cursor is above 50%
  //       // Dragging downwards
  //       if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
  //           return;
  //       }
  //       // Dragging upwards
  //       if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
  //           return;
  //       }
  //       // Time to actually perform the action
  //       props.moveCard(item.listId, item.cardId, hoverIndex, hoverList);
  //       // Note: we're mutating the monitor item here!
  //       // Generally it's better to avoid mutations,
  //       // but it's good here for the sake of performance
  //       // to avoid expensive index searches.
  //       item.index = hoverIndex;
  //   }
  //   }),
  //   [props.index, props.listId]
  // );
  // drag(drop(ref));

  if(typeof props.cardId === "undefined") {
    return null;
  }

  return (
    <div ref={ref} className="card" /*style={{opacity: isDragging ? 0.4 : 1}}*/>
      <SimpleTextProperty action={ changeTitle } prop={ card.title } id={ card.id } />
      <RemoveItem action={removeCard} id={card.id} />
      {/* <span onClick={e => props.move(props.card.id, props.index - 1)}>Up</span><span onClick={e => props.move(props.card.id, props.index + 1)}>Down</span> */}
    </div>
  )
}
