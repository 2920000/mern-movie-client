import React, { useEffect } from 'react'
import Poster from '../poster-movie/Poster'
import './movie-grid.scss'
function MovieGrid(props) {
    const {movies,type}=props
    useEffect(()=>{
         
    },[])
  return (
    <div className=''>
     <div className='banner'>
   <img  src='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-movies-1614634680.jpg' alt='' />
   </div>
      <div className='container'>
         <div className='movie-grid'>
                {movies.map(movie=><div className='poster' key={movie.id}>
                <Poster type={type} className='grid'  e={movie}/>
            </div>)}
         </div>
      </div>
        
    </div>
  )
}

export default MovieGrid