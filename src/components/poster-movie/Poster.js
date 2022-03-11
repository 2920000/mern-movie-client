import React, { memo, useEffect, useState } from "react";
import { TiStarFullOutline } from "react-icons/ti";
import { FaPlayCircle } from "react-icons/fa";
import  { movieType } from "../../api/apiThemovie";
import { Link } from "react-router-dom";
import apiConfig from "../../api/apiConfig";
import "./poster.scss";
function Poster(props) {
  let { type, e, className, rank } = props;
  const [opacity, setOpaicty] = useState(0.2);
  const { upcoming, latest, top_rated, trending, popular } = movieType;
  let category = null;
  switch (type) {
    case upcoming:
    case latest:
    case top_rated:
    case trending:
    case popular:
    case "movie":
      category = "movie";
      break;
    //  case 'tv':
    //   category='tv'
    //  break
    default:
      category = "tv";
  }

  useEffect(() => {
    setTimeout(() => {
      setOpaicty(1);
    }, 50);
  }, []);
  const handleRememberPosition = () => {
    // sessionStorage.setItem()
  };

  const checkClassName = className === "home-sidebar";
  return (
    <Link
      className="poster-link"
      onClick={handleRememberPosition}
      to={`/${e.media_type || category || "movie"}/${e.id}`}
    >
      <div className={`image-container  ${className}`}>
        {/* <img style={{opacity:opacity}}  className={`poster-image ${props.className}`}   src={apiConfig.originalImage(props.e.poster_path)}  alt='' /> */}
        <div
          className={`poster-image ${className}`}
          style={{
            backgroundImage: `url(${apiConfig.w500Image(e.poster_path)})`,
            opacity: opacity,
          }}
        ></div>
        <div className="image-overlay">
          <FaPlayCircle />
        </div>
        {checkClassName && (
          <span className="rank">
            <span className="rank-number">{rank}</span>
          </span>
        )}
        {checkClassName && (
          <p className="sidebar-title">
            {e.title || e.name}({e.release_date && e.release_date.slice(0, 4)}
            {e.first_air_date && e.first_air_date.slice(0, 4)})
          </p>
        )}
        {checkClassName && (
          <div className="sidebar-title-english">
            {e.original_title||e.original_name}
          </div>
        )}
        {!checkClassName && (
          <span className="vote">
            <TiStarFullOutline className="star" />
            <span className="score">{e.vote_average}</span>
          </span>
        )}
      </div>
      {!checkClassName && (
        <p className="poster-title-vietnamese">{e.title || e.name}</p>
      )}
      {!checkClassName && (
        <div className="poster-title-english">
        {e.original_title||e.original_name}
        </div>
      )}
     
    </Link>
  );
}

export default memo(Poster);
