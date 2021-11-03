import { useDispatch } from 'react-redux'
import { EditableText } from '../utils/EditableText'
import { changeTitle, removeCard } from './cardSlice'
import { RemoveItem } from '../utils/RemoveItem'
import "./card.css"

export function Card(props) {
    const dispatch = useDispatch();
    return (
      <div className="card">
        <EditableText value={props.card.cardTitle} onChange={(e) => dispatch(changeTitle({id: props.card.id, value: e.target.value}))} />
        <RemoveItem action={removeCard} id={{cardId: props.card.id, listId: props.listId}} />
      </div>
    )
}
