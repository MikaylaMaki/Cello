import { CelloList } from './list/CelloList';
import { Boards } from './board/Boards'
import { BoardTitle } from './board/BoardTitle'
import { NewList } from './list/NewList';
import { useSelector } from 'react-redux'
import './base.css'

export function Cello() {
  let boards = {  //todo: add this to automerge state
    byId: {
      "board0": {
        id: "board0",
        title: "Test Board 1",
        lists: ["list0", "list1"]
      },
      "board1": {
        id: "board1",
        title: "Test Board 2 Extra",
        lists: ["list0", "list1"]
      },
      "board2": {
        id: "board2",
        title: "Test Board 3",
        lists: ["list0", "list1"]
      },
    },
    allIds: ["board0", "board1", "board2"]
  };
  let selectedBoard = boards.byId["board0"]; //TODO pull this from a URL route

  let lists = useSelector((state) => {return state.lists});

  let listEls = lists.allIds.map((listId) => {
    let list = lists.byId[listId];
    return <CelloList key={listId} list={list} />
  })

  return (
    <div className="app-container" style={{display: "flex"}}>
      <Boards boards={boards} />
      <div className="main-view-container">
        <div class="main-title-container"
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
          <BoardTitle board={selectedBoard} />
        </div>
        <div class="main-title-buffer" style={{minHeight: "4em"}}>
        </div>
        <div style={{  display: "flex", alignItems: "flex-start"}}
            className="list-container">
            {listEls}
            <NewList />
        </div>
      </div>
    </div>
  );
}
