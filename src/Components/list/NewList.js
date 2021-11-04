import React from 'react';
import { useDispatch } from 'react-redux'
import { newList } from './listSlice'
import "./list.css"

export function NewList(props) {
  const dispatch = useDispatch();

  return (
    <button className="list new click interaction"
        onClick={(e) => dispatch(newList({boardId: props.selectedId}))}>
         <label className="list-title">
          + Add a new list
         </label>
    </button>
  );
}
