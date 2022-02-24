import React, { useEffect, useState } from 'react'
import './movie-sidebar.scss'
import tmdbApi ,{category,tvType} from '../../api/apiThemovie'
import Poster from '../poster-movie/Poster'
import apiConfig from '../../api/apiConfig'
function MovieSidebar(props) {
    const [movies,setMovies]=useState([])
    useEffect(()=>{
        const params={
        }
        let response=null
          const fetchData=async()=>{
              switch(props.catalog){
                case category.movie:
                   response= await tmdbApi.getTrendingMoives({params})
                   setMovies(response.results.slice(0,10))
                break
                default:
                   response= await tmdbApi.getTvList(tvType.popular,{params})
              setMovies(response.results.slice(0,10))
              console.log(response.results)

              }
          }
          fetchData()
    },[props.catalog])
  return (
    <div className='movie-sidebar'>
        {movies.map((e,i)=><div className='movie-sidebar-poster' key={e.id}>
             <Poster  type={props.catalog} e={e} className='sidebar'  rank={i+1}/>
        </div>)}
    </div>
  )
}

export default MovieSidebar