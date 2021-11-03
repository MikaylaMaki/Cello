import React from 'react';
import { useDispatch } from 'react-redux'
import "./remove-item.css";

export function RemoveItem(props) {
  const dispatch = useDispatch();

  return (
    <button className="remove-item click interaction" onClick={(e) => dispatch(props.action(({id: props.id})))}>
      x
    </button>
  );
}
