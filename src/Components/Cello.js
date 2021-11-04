import { CelloList } from './list/CelloList';
import { Boards } from './board/Boards'
import { BoardTitle } from './board/BoardTitle'
import { NewList } from './list/NewList';
import { useSelector } from 'react-redux'
import './base.css'

export function Cello() {
  let boards = useSelector((state) => {return state.boards});
  let selectedBoard = null;
  let boardTitleEl = null;
  let listsEl = null;
  let lists = useSelector((state) => {return state.lists});

  if(boards.allIds.length !== 0) {
    selectedBoard = boards.byId[boards.allIds[0]]; //TODO pull this from a URL route
    boardTitleEl = <BoardTitle board={selectedBoard} />

    let listEls = selectedBoard.lists.map((listId) => {
      let list = lists.byId[listId];
      return <CelloList key={listId} list={list} boardId={selectedBoard.id} />
    })

    listsEl = (
      <div style={{  display: "flex", alignItems: "flex-start"}}
          className="list-container">
          {listEls}
          <NewList selectedId={selectedBoard.id}/>
      </div>
    )
  }


  return (
    <div className="app-container" style={{display: "flex"}}>
      <Boards boards={boards} selected={selectedBoard} />
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
