import { CelloList } from './list/CelloList';
import { Boards } from './board/Boards'
import { BoardTitle } from './board/BoardTitle'
import { NewList } from './list/NewList';
import { useState } from 'react'
import { useSelector } from 'react-redux'
import './base.css'

export function Cello() {
  let boards = useSelector((state) => {return state.boards});
  // let selectedBoard = null;
  let boardTitleEl = null;
  let listsEl = null;
  let lists = useSelector((state) => {return state.lists});
  let currentBoard =
    boards.allIds.length ?
        boards.byId[boards.allIds[0]] :
        null;

  if(currentBoard !== null) {
    boardTitleEl = <BoardTitle board={currentBoard} />

    let listEls = currentBoard.lists.map((listId) => {
      let list = lists.byId[listId];
      return <CelloList key={listId} list={list} boardId={currentBoard.id} />
    })

    listsEl = (
      <div style={{  display: "flex", alignItems: "flex-start"}}
          className="list-container">
          {listEls}
          <NewList selectedId={currentBoard.id}/>
      </div>
    )
  }


  return (
    <div className="app-container" style={{display: "flex"}}>
      <Boards boards={boards} selected={currentBoard} />
      <div className="main-view-container">
        <div className="main-title-container"
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "1em",
            position: "fixed",
            width: "100vw",
            right: "0",
            top: "0",
            height: "4em",
            zIndex: "1",
            borderBottom: "1px solid purple",
            borderTop: "1px solid purple",
            backgroundColor: "white"
          }}>
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
