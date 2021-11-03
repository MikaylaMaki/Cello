import { useDispatch } from 'react-redux'
import { newCard } from './cardSlice'
import "./card.css"

export function NewCard(props) {
  const dispatch = useDispatch();

  return (
    <button className="card new click interaction"
         onClick={(e) => {dispatch(newCard({listId: props.listId}))}}>
         <div className="card-title">
          + Add a new card
         </div>
    </button>
  );
}
