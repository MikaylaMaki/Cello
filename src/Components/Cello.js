import { Lists } from './list/Lists';
import { Boards } from './board/Boards'
import { BoardTitle } from './board/BoardTitle'
import { useSelector, useStore } from 'react-redux'
import './base.css'
import { useEffect, useState } from 'react';

export function Cello() {
  let boardTitleEl = null;
  let listsEl = null;

  let [currentBoardId, setcurrentBoardId] = useState(window.location.pathname.replace(/^\/|\/$/g, ''));

  const setBoard = (boardId) => {
    window.history.pushState(null, null, boardId);
    setcurrentBoardId(boardId);
  }

  useEffect(() => store.subscribe(() => {
      let state = store.getState();
      
      if(state.boards.allIds.length) { //If data is present
        if(currentBoardId === "" || !state.boards.allIds.includes(currentBoardId)) { //And we're not
          window.history.pushState(null, null, state.boards.allIds[0]); //Update current
          setcurrentBoardId(state.boards.allIds[0]); 
        }
      } else { //Otherwise make sure current is also not present
        if(window.location.pathname !== "/") {
          window.history.pushState(null, null, "/");
        }
        setcurrentBoardId("");
      }
  }, []));

  if(boards.allIds.includes(currentBoardId)) {
    boardTitleEl = <BoardTitle boardId={currentBoardId} />

    listsEl = (
      <Lists boardId={currentBoardId} />
    );
  }


  return (
    <div className="app-container" style={{display: "flex"}}>
      <Boards boards={boards} selected={currentBoardId} setCurrent={setBoard} />
      <div className="main-view-container">
        <div className="main-title-container">
          <div className="logo-buffer" style={{minHeight: "5em", minWidth: "5em"}}></div>
          { boardTitleEl }
        </div>
        <div className="main-title-buffer" style={{minHeight: "4em"}}>
        </div>
        {listsEl}
      </div>
    </div>
  );
}
