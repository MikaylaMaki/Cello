import { SimpleTextProperty } from "../utils/SimpleTextProperty";
import { changeTitle } from "./boardSlice";

export function BoardTitle(props) {
  return (
    <SimpleTextProperty prop={props.board.title} action={changeTitle} id={props.board.id} />
  )
}
