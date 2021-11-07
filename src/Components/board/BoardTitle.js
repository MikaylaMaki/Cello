import { useSelector } from "react-redux";
import { SimpleTextProperty } from "../utils/SimpleTextProperty";
import { changeTitle } from "./boardSlice";

export function BoardTitle(props) {
  let state = useSelector((state) => state);
  let tutorialEl = null;

  console.log("****************")
  console.dir(state);
  console.log(state.boards.allIds.length);
  console.dir(state.boards.byId[state.boards.allIds[0]].title);
  console.log(state.boards.byId[state.boards.allIds[0]].title === "New Board");
  if(state.boards.allIds.length === 1 && state.cards.allIds.length === 0 && state.lists.allIds.length === 0 && state.boards.byId[state.boards.allIds[0]].title === "New Board") {
    console.log("here");
    tutorialEl = (
      <span style={{color: "gray", fontSize: "1.25em"}}>&nbsp;← Click any text to edit</span>
    )
  }
  return (
    <>
    <SimpleTextProperty prop={props.board.title} action={changeTitle} id={props.board.id} />
    {tutorialEl}
    </>
  )
}
