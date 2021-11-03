import { EditableText } from "../utils/EditableText";

export function BoardTitle(props) {
  return (
    <EditableText value={props.board.title}></EditableText>
  )
}
