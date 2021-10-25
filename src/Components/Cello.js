import { CelloList } from './list/CelloList';
import { useSelector } from 'react-redux'

export function Cello() {
  let lists = useSelector((state) => {return state.lists});

  let listEls = lists.allIds.map((listId) => {
    let list = lists.byId[listId];
    return <CelloList key={list.listTitle} list={list} listId={listId} />
  })

  return (
    <div style={{  display: "flex", alignItems: "flex-start"}}
         className="list-container">
      {listEls}
    </div>
  );
}
