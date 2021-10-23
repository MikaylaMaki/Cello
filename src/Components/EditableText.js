import React, { useState } from 'react';


export function EditableText(props) {
  const [focused, setFocused] = useState(false);
  const [text, setText] = useState(props.value);
  return (
    <span tabIndex="0" className="edit-text__container" onFocus={() => {setFocused(true)}} onBlur={() => {setFocused(false)}}>
      {
        focused
        ? <input autoFocus className="edit-text__input" type="text" value={text} onChange={(e) => {setText(e.target.value); props.onChange(e);}} />
      : <span tabIndex="0" className="edit-text__text">{text}</span>
      }
    </span>
  )
}
