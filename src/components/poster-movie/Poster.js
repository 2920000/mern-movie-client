import React,{memo} from 'react'
import {AiOutlinePlayCircle} from 'react-icons/ai'
import {TiStarFullOutline} from 'react-icons/ti'
import { movieType } from '../../api/apiThemovie'
import { Link } from 'react-router-dom'
import apiConfig from '../../api/apiConfig'
import './poster.scss'
function Poster(props) {
  let {type}=props
  const {upcoming,latest,top_rated,trending,popular} =movieType
  switch (type){
       case upcoming:
       case latest :
       case top_rated :
       case trending :
       case popular:
          type='movie'
            break
       default: 
        // type='tv'
     
  }
  const handleRememberPosition=()=>{
    // sessionStorage.setItem()
  }
  const checkClassName=props.className==='sidebar'
  return (
     <Link className='poster-link' onClick={handleRememberPosition} to={`/${props.e.media_type||type||'movie'}/${props.e.id}`}>        
            <div className={`image-container  ${props.className}`}>
            {/* <img className={`poster-image ${props.className}`} src={apiConfig.originalImage(props.e.poster_path)} alt='' /> */}
            <div className={`poster-image ${props.className}`} style={{backgroundImage:`url(${apiConfig.originalImage(props.e.poster_path)})`}} ></div>
                    <div className='image-overlay' >
                        <AiOutlinePlayCircle/>
                      </div>
                     {checkClassName&&<span className='rank'><span className='rank-number'>{props.rank}</span></span>} 
                      {checkClassName&&<p className='sidebar-title'>{props.e.title||props.e.name}</p>}
                      {!checkClassName&&<span className='vote'><TiStarFullOutline className='star'/><span className='score'>{props.e.vote_average}</span></span>}
              </div>   
                 {!checkClassName&&<p >{props.e.title||props.e.name}</p>}
     </Link>
  
    
  )
}

export default memo(Poster)