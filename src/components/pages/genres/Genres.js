import React, { useEffect, useState } from 'react'
import './genres.scss'
import tmdbApi from '../../../api/apiThemovie'
import {useParams} from 'react-router-dom'
import Poster from '../../poster-movie/Poster'
function Genres() {
  const [movieByGenre,setMovieByGenre]=useState([])
  const {genreNumber}=useParams()
  const params={
    with_genres:genreNumber
  }
  useEffect(()=>{
    const fetchData=async()=>{
      const response=await tmdbApi.getMovieDiscover({params})
      setMovieByGenre(response.results)
    }
    fetchData()
  },[genreNumber])
  return (
    <div className='genre-movie'>
      {movieByGenre.map(e=><div>
         <Poster e={e} />
      </div>)}
    </div>
  )
}

export default Genres