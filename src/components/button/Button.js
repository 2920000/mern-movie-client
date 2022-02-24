import React from 'react'
import './button.scss'
import {useNavigate} from 'react-router-dom'
function Button(props) {
  const navigate=useNavigate()
  const handleNavigate=()=>{
    if(props.type){
      navigate(`/${props.type}`)
    }
    // if(props.watch){
    //   if(props.seasonsId){
    //     navigate(`/watch/${props.seasonsId}`)
    //   }else{
    //     navigate(`/watch/${props.movieId}`)
    //   }

    // }
  }
  
  return (
    <button onClick={props.onClick} className={`btn ${props.className} ${props.color?'red':'white'}`  }>
        {props.children}
    </button>
  )
}

export default Button