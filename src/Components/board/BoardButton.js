import { useSelector } from "react-redux";
import { RemoveItem } from "../utils/RemoveItem"
import { removeBoard, selectBoard } from './boardSlice'

export function BoardButton(props) {
  let board = useSelector(selectBoard(props.id));
  let title = board.title;
  title = title.match(/\b(\w)/g); //https://stackoverflow.com/a/8279881
  title = title.slice(0, 3) //First three letters
  title = title.join("");

  let classes = "board-button interaction click " + (props.selected ? "selected" : "");
  return (
    <div className="board-button-interaction-container">
      <button className={classes} onClick={(e) => props.setCurrent(board.id)}>{title}</button>
      <RemoveItem id={board.id} action={removeBoard} />
    </div>
  )
}
