import { RemoveItem } from "../utils/RemoveItem"

export function BoardButton(props) {
  let title = props.board.title;
  title = title.match(/\b(\w)/g); //https://stackoverflow.com/a/8279881
  title = title.slice(0, 3) //First three letters
  title = title.join("");

  let classes = "board-button interaction click " + (props.selected ? "selected" : "");
  return (
    <button className={classes}><RemoveItem id={props.board.id} action={() => {}} />{title}</button>
  )
}
