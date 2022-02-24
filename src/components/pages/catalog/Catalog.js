import React, { useEffect, useState } from 'react'
import tmdbApi,{movieType,tvType} from '../../../api/apiThemovie'
import { useParams} from 'react-router-dom'
import MovieGrid from '../../movie-grid/MovieGrid'
import Spinner from '../../spinner/Spinner'
function Catalog() {
  const [movies,setMovies]=useState([])
  const [load,setLoad]=useState(false)
  const [numberPage,setNumbePage]=useState(1)
  const {category,pageNumber}=useParams()
 
  useEffect(()=>{
    window.scrollTo(0,0)
    const params={
      page:numberPage
    }
        const fetchData=async()=>{
              let response=null
               switch(category){
                 case movieType.trending:
                    response=await tmdbApi.getTrendingMoives({params})
                      break
                 case 'movie':
                   response=await tmdbApi.getMovieList(movieType.popular,{params})
                   break
                 case 'tv' :
                   response=await tmdbApi.getTvList(tvType.popular,{params})
                   break
                   default :
                 response =await tmdbApi.getMovieList(category,{params})
               }
               setMovies(response.results)
               setLoad(true)
          }
        fetchData()
        return ()=>setMovies([])
  },[category,pageNumber])
  return (
    <div>
       {load
       ?<>
       <MovieGrid type={category}  movies={movies} />
       <ul>
         {/* <li>{pageNumber}</li>
         <li>{2}</li>
         <li>{3}</li>
         <li>{4}</li>
         <li>{5}</li> */}

       </ul>
       </>
       :<Spinner/>}
    </div>
  )
}

export default Catalog