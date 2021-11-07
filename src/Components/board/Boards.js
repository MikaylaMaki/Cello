import { BoardButton } from './BoardButton';
// import { NewBoard } from './NewBoard';
import { NewItem } from '../utils/NewItem';
import './board.css'
import { newBoard } from './boardSlice';

export function Boards(props) {
  let boardEls = null;
  let clickMe = null;
  if(props.boards.allIds.length > 0) {
    boardEls = props.boards.allIds.map((boardId) => {
      let board = props.boards.byId[boardId];
      if(boardId === props.selected.id) {
        return <BoardButton selected={true} key={boardId} board={board} />
      } else {
        return <BoardButton key={boardId} board={board} />
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
