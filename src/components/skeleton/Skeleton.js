import React from 'react'
import './skeleton.scss'
function Skeleton(props) {
    const {className}=props
  return (
    <div className='loaderStyle'  >
        <div className={`${className}`}></div>
    </div>
  )
}

export default Skeleton