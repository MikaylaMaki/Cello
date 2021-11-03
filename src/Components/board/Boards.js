import { BoardButton } from './BoardButton';
import { NewBoard } from './NewBoard';
import './board.css'

export function Boards(props) {
  let boardEls = props.boards.allIds.map((boardId) => {
    let board = props.boards.byId[boardId];
    if(boardId === "board0") {
      return <BoardButton selected={true} key={boardId} board={board} />
    } else {
      return <BoardButton key={boardId} board={board} />
    }
  })

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
          <NewBoard />
      </div>
      <div className="board-buffer" style={{minWidth: "5em"}}></div>
    </div>
  );
}
