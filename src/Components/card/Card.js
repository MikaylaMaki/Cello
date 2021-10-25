import { useDispatch } from 'react-redux'
import { EditableText } from '../EditableText'
import { changeTitle } from './cardSlice'

export function Card(props) {
    const dispatch = useDispatch();
    return (
      <div style={{ minHeight: "1em", padding: ".25em", margin: ".5em", border: "1px solid purple"}}
           className="card">
        <EditableText value={props.card.cardTitle} onChange={(e) => dispatch(changeTitle({id: props.cardId, value: e.target.value}))} />
      </div>
    )
}
