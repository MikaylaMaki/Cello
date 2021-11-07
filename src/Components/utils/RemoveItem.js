import { useDispatch } from 'react-redux'

export function RemoveItem(props) {
  const dispatch = useDispatch();
  return (
    <button className="remove-item click interaction remove" onClick={(e) => dispatch(props.action( props.id))}>x</button>
  );
}
