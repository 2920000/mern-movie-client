import React, { useEffect, useState } from 'react'
import './watch-movie.scss'
import {useParams} from 'react-router-dom'
import tmdbApi from '../../../api/apiThemovie'
function WatchMovie() {
    const {category,movieId}=useParams()
    const [detail,setDetail]=useState()
    useEffect(()=>{
      const params={

      }
       const fetchData=async()=>{
         const response=await tmdbApi.getMovieDetail(category,movieId,{params})
         setDetail(response)
       }
       fetchData()

       
    },[])
    console.log(detail)
  return (
    <div className='watch'>
      <div className='container-movie'>
        <div className='watch-flex'>
             <div className='watch-left'>
             <iframe width='700px' height='400px'    />
    
    {/* {category==='movie'
    ?<iframe width='700px' height='400px'  src={`https://www.2embed.ru/embed/tmdb/movie?id=${movieId}`}  />
    :<iframe width='700px' height='400px'  src={`https://www.2embed.ru/embed/tmdb/tv?id=${movieId} ID&s=1 NUMBER&e=1 NUMBER`} />} */}
             </div>
             <div className='watch-right'></div>

        </div>
     
      </div>

    </div>
  )
}

export default WatchMovie