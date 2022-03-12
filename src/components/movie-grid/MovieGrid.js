import React from "react";
import titleFucntion from "../../title/titleFucntion";
import Pagination from "../pagination/Pagination";
import Poster from "../poster-movie/Poster";
import "./movie-grid.scss";
function MovieGrid(props) {
  let { movies, type,pageNumber } = props;
  let tranlateType = type;
  
  switch (tranlateType) {
    case "popular":
      tranlateType = "PHIM PHỔ BIẾN";
      break;
    case "upcoming":
      tranlateType = "PHIM SẮP CHIẾU";
      break;
    case "top_rated":
      tranlateType = "PHIM ĐÁNH GIÁ CAO";
      break;
    case "movie":
      tranlateType = "PHIM LẺ";
      break;
    case "tv":
      tranlateType = "PHIM BỘ";
      break;
    default:
  }
  const paginationProps={
    pageNumber,
    type
  }
  document.title=titleFucntion(tranlateType)
  return (
    <div>
      <div className="container">
        <h3 className="movie-grid-title">{tranlateType}</h3>
        <div className="movie-grid">
          {movies.map((movie) => (
            <div className="poster" key={movie.id}>
              <Poster type={type} className="grid" e={movie} />
            </div>
          ))}
        </div>

         <Pagination {...paginationProps} />
      </div>
    </div>
  );
}

export default MovieGrid;
