import React, { useEffect, useRef, useState } from 'react'
import './movie-list.scss'
import tmdbApi,{movieType,category} from '../../api/apiThemovie'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Poster from '../poster-movie/Poster'
function MovieList(props) {
    const [movieList,setMovieList]=useState([])
    const [load,setLoad]=useState(false)
    const ref=useRef()
    useEffect(()=>{
        const params={
           page:1
        }
         const fetchData=async()=>{
           let response=null
                if(props.type!=='similar'){
                  switch(props.type){
                    case movieType.trending:
                      response= await tmdbApi.getTrendingMoives({params})
                      break;
                    default :
                      response = await tmdbApi.getMovieList(props.type,{params})
                }

            }
            else{
                 response= await tmdbApi.getMovieSimilar(props.category,props.id)
            }
            setMovieList(response.results.slice(0,10))
              setLoad(true)
         } 
         //
            fetchData()
       
             
           
         return ()=>setMovieList([])
       
    },[])
    const settings = {
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 5,
        speed: 500,
        initialSlide: 0,
        responsive:[
         { breakpoint: 1025,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
          }
        },
        {
          breakpoint: 769,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          }
        },
        {
          breakpoint: 460,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          } 
        }
        ]
      };
      
  return (
            //  <Slider {...settings}>
             <div >
               {load
               ?<>
               <div  className={`movie-list `} id={props.id}  >
                {movieList.map(e=>
            <div    className='poster' key={e.id}>
             <Poster load={load} e={e} />
                </div>
                 )}
             </div>
               </>
               :<div className='movie-loading'>
                        <p></p>
                      <div className='skeleton-image'> 
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>

                      
               </div>}
             </div>
                //  </Slider>
              
  )
}

export default MovieList

