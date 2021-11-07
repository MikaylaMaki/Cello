import { useDispatch } from 'react-redux';

export const NewItem = (props) => {
  const dispatch = useDispatch()
  return (
    <button onClick={(e) => dispatch(props.action(props.actionArg))} className="new click interaction">+</button>
  )
}