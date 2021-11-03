import { CelloList } from './list/CelloList';
import { NewList } from './list/NewList';
import { useSelector } from 'react-redux'
import './base.css'

export function Dev() {
  // let lists = useSelector((state) => {return state.lists});

  // let listEls = lists.allIds.map((listId) => {
    // let list = lists.byId[listId];
    // return <CelloList key={listId} list={list} />
  // })

  return (
    <div style={{  display: "flex", alignItems: "flex-start"}}
         className="list-container">
      // {listEls}
      // <NewList />
    </div>
  );
}
