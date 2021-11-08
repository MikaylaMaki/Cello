import { CelloList } from "./CelloList";
import { NewItem } from "../utils/NewItem";
import { newList } from "./listSlice";

export function Lists(props) {
    let listEls = props.lists.map((list) => {
      return <CelloList key={list.id} list={list} />
    })

    // const move = ({from: {fromListId, fromCardId}, to: {toListId, toCardId}}) => {
      // 
      // let arrayCopy = [...ourCards];
      // let cardIndex = arrayCopy.indexOf(cardId);
      // arrayMove(arrayCopy, cardIndex, index);
      // setOurCards(arrayCopy);
    // }
  
      
    return (
      <div style={{  display: "flex", alignItems: "flex-start"}} className="list-container">
        {listEls}
        <NewItem action={newList} actionArg={props.boardId} />
    </div>
    )
}