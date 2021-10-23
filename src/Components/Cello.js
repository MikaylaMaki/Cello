import { CelloList } from './CelloList';
import { useSelector } from 'react-redux'

export function Cello() {
  let celloData = useSelector((state) => {return state});
  console.log(celloData);

  let listEls = celloData.lists.map((list) => {
    return <CelloList key={list.listTitle} list={list}/>
  })

  return (
    <div style={{  display: "flex", alignItems: "flex-start"}}
         className="list-container">
      {listEls}
    </div>
  );
}
