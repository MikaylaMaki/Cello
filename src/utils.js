
//source: https://stackoverflow.com/a/7180095
export const arrayMove = (array, from, to) => {
  array.splice(to, 0, array.splice(from, 1)[0]);
};
  
//Source: https://stackoverflow.com/a/16436975
export const arraysEqual = (a, b) => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;
  
  for (var i = 0; i < a.length; ++i) {
   if (a[i] !== b[i]) return false;
  }
  return true;
}

// export const useSortable = ({realMove, virtualMove,}) => {  
//   //TODO refactor this into a custom hook
//   const originalIndex = props.index;
//   const [{ isDragging }, drag] = useDrag(() => ({
//     type: "CARD",
//     item: () => {
//       return { cardId: props.card.id,  listId: props.listId, index: props.index, originalIndex: originalIndex};
//     },
//     collect: (monitor) => ({
//       isDragging: !!monitor.isDragging()
//     }),
//     end: (item, monitor) => {
//       if(!monitor.didDrop()) {
//         realMove(item.listId, item.cardId, item.originalIndex);
//       }
//     }
//   }), [originalIndex]);

//   const [, drop] = useDrop(() => ({
//       accept: "CARD",
//       drop: (item, monitor) => {
//         dispatch(moveCard(item.cardId, item.listId, item.index));
//       },
//       hover(item, monitor) { //From: https://react-dnd.github.io/react-dnd/examples/sortable/simple
//         if (!ref.current) {
//             return;
//         }
//         const dragIndex = item.index;
//         const hoverIndex = props.index;
//         const hoverList = props.list;
//         // Don't replace items with themselves
//         if (dragIndex === hoverIndex) {
//             return;
//         }
//         //TODO: Refine the UX of this algorithm. Past 50% is too much, more reasonably is mouse past the 
//         //20% mark on either side (probably)

//         // Determine rectangle on screen
//         const hoverBoundingRect = ref.current?.getBoundingClientRect();
//         // Get vertical middle
//         const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
//         // Determine mouse position
//         const clientOffset = monitor.getClientOffset();
//         // Get pixels to the top
//         const hoverClientY = clientOffset.y - hoverBoundingRect.top;
//         // Only perform the move when the mouse has crossed half of the items height
//         // When dragging downwards, only move when the cursor is below 50%
//         // When dragging upwards, only move when the cursor is above 50%
//         // Dragging downwards
//         if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
//             return;
//         }
//         // Dragging upwards
//         if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
//             return;
//         }
//         // Time to actually perform the action
//         props.move(item.listId, item.cardId, hoverIndex, hoverList);
//         // Note: we're mutating the monitor item here!
//         // Generally it's better to avoid mutations,
//         // but it's good here for the sake of performance
//         // to avoid expensive index searches.
//         item.index = hoverIndex;
//     }
//     }),
//     [props.index]
//   );
//   return [drag, drop, isDragging];
// }