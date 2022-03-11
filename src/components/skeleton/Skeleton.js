import React from 'react'
import './skeleton.scss'
function Skeleton(props) {
    const {className}=props
  return (
        <div className={`${className}`}>
          {className==='category'
          &&<ul className='skeleton-list'>
            {Array(20).fill().map((item,index)=><li className='skeleton-item' key={index}>
            </li>)}
          </ul>}
        </div>
  )
}

export default Skeleton