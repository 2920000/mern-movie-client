import React ,{useState,useEffect}from 'react'
import './spinner.scss'
function Spinner() {
   document.body.style.overflowY='hidden'
  useEffect(() => {
    return () => 
    {document.body.style.overflowY='auto';
  }
  }, []);
  return (
    <div className='loading'></div>
  )
}

export default Spinner