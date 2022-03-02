import React from 'react'
import './button.scss'
function Button(props) {
  return (
    <button onClick={props.onClick} className={`btn ${props.className}   ${props.color?'red':'white'}`  }>
        {props.children}
    </button>
  )
}
export default Button