import React, { useState } from 'react';


export function EditableText(props) {
  const [focused, setFocused] = useState(props.focused ? true : false);
  const [text, setText] = useState(props.value);

  let change = function(e) {
    setText(e.target.value);
  }

  let keyDown = function(e) {
    if(e.key === "Enter" || e.keyCode === 13) {
      e.preventDefault();
      if(props.onChange) {
        props.onChange(e)
        setFocused(false);
      }
    } else if(e.key === "Escape" || e.keyCode === 27) {
      e.preventDefault();
      setFocused(false);
    }
  }

  return (
    <span tabIndex="0" className="edit-text__container" onFocus={() => {setFocused(true)}} onBlur={() => {setFocused(false)}}>
      {
        focused
        ? <input autoFocus className="edit-text__input" type="text" value={text} onKeyDown={keyDown} onChange={change} />
        : <span tabIndex="0" className="edit-text__text">{props.value}</span>
      }
    </span>
  )
}
