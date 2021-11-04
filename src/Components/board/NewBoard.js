import { useDispatch } from 'react-redux';
import { newBoard } from './boardSlice';

export function NewBoard(props) {
  const dispatch = useDispatch()
  return (
    <button onClick={(e) => dispatch(newBoard())} className="board new click interaction">+</button>
  )
}
