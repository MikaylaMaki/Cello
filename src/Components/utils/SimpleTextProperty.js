import { EditableText } from "./EditableText";
import { useDispatch } from 'react-redux'

/**
 * props.action -> An action generator function for dispatch()
 * props.id -> The ID of the object being updated
 * props.variable -> The property to display
 */
export function SimpleTextProperty(props) {
  const dispatch = useDispatch();

  return (
    <EditableText value={props.prop} onChange={(e) => {dispatch(props.action({id: props.id, value: e.target.value}))}} />
  )
}
