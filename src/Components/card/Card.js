import { SimpleTextProperty } from '../utils/SimpleTextProperty'
import { changeTitle, removeCard } from './cardSlice'
import { RemoveItem } from '../utils/RemoveItem'
import "./card.css"

export function Card(props) {
    return (
      <div className="card">
        <SimpleTextProperty action={ changeTitle } prop={ props.card.title } id={ props.card.id } />
        <RemoveItem action={removeCard} id={{cardId: props.card.id, listId: props.listId}} />
      </div>
    )
}
