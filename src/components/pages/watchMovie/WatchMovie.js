import React, { useEffect } from 'react'
import './watch-movie.scss'
import {useParams} from 'react-router-dom'
import tmdbApi from '../../../api/apiThemovie'
import axios from 'axios'
function WatchMovie() {
    const {movieId}=useParams()
    useEffect(()=>{
        //  axios.get(`https://api.themoviedb.org/3/tv/${movieId}/season/1/episode/1?api_key=cc0885e73e8fa7eef070814cd0659931&language=en-US`)
         axios.get(`https://api.themoviedb.org/3/tv/${movieId}/season/1?api_key=cc0885e73e8fa7eef070814cd0659931&language=en-US`)
         .then(
            res=>console.log(res.data)
          )
    },[])
  return (
    <div className='video'>
        {/* <iframe width='100%' height='650px' src={`https://www.2embed.ru/embed/tmdb/movie?id=${movieId}`}  /> */}
        <iframe width='100%' height='650px' src={`https://www.2embed.ru/embed/tmdb/tv?id=${movieId}&s=1&e=2`}  />

    </div>
  )
}

export default WatchMovie