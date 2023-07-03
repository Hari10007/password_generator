import React from 'react'

function Button({ text, customClass, onclick }) {
  return (
    <button className={customClass} onClick={onclick}>
        {text}
    </button>
  )
}

export default Button
