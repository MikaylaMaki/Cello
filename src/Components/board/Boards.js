import { BoardButton } from './BoardButton';
// import { NewBoard } from './NewBoard';
import { NewItem } from '../utils/NewItem';
import './board.css'
import { newBoard, selectBoardIds } from './boardSlice';
import { useSelector } from 'react-redux';

export function Boards(props) {
  let boardIds = useSelector(selectBoardIds());
  let boardEls = null;
  let clickMe = null;

  if(boardIds.length > 0) {
    boardEls = boardIds.map((boardId) => {
      if(props.selected && boardId === props.selected) {
        return <BoardButton selected={true} key={boardId} id={boardId} setCurrent={props.setCurrent} />
      } else {
        return <BoardButton                 key={boardId} id={boardId} setCurrent={props.setCurrent} />
      }
    })
  } else {
    clickMe = (
      <div style={{color: "grey"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↑<br/>Click Me!</div>
    )
  }

  return (
    <div className="board-container">
      <div className="board-button-container">
        <div className="logo-container"
        style={{
         minWidth: "4em",
         minHeight: "4em",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
            <span className="logo" style={{fontSize: "2em"}}>🎻</span>
          </div>
          {boardEls}
          <NewItem action={newBoard} />
          {clickMe}
      </div>
      <div className="board-buffer" style={{minWidth: "5em"}}></div>
    </div>
  );
}
