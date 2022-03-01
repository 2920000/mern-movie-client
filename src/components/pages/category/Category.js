import React, { useEffect, useState } from "react";
import tmdbApi, { movieType, tvType } from "../../../api/apiThemovie";
import { Link, useParams } from "react-router-dom";
import MovieGrid from "../../movie-grid/MovieGrid";
import Spinner from "../../spinner/Spinner";
import "./category.scss";
function Catalog() {
  const [movies, setMovies] = useState([]);
  const [load, setLoad] = useState(false);
  const { category, pageNumber } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    const params = {
      page: pageNumber,
    };
    const fetchData = async () => {
      let response = null;
      switch (category) {
        case movieType.trending:
          response = await tmdbApi.getTrendingMoives({ params });
          break;
        case "movie":
          response = await tmdbApi.getMovieList(movieType.popular, { params });
          break;
        case "tv":
          response = await tmdbApi.getTvList(tvType.popular, { params });
          break;
        default:
          response = await tmdbApi.getMovieList(category, { params });
      }
      setMovies(response.results);
      setLoad(true);
    };
    fetchData();
    return () => setLoad(false)
  }, [category, pageNumber]);
  return (
    <div>
      {load ? (
        <div className="catalog">
          <MovieGrid type={category} movies={movies} />
          <div className="pagination">
            <Link to={`/${category}/page/${pageNumber-1}`} className="pre-page">Trước</Link>
            <Pagination
              className="pagination-number"
              category={category}
              pageNumber={pageNumber}
            />
            <Link to={`/${category}/page/${1+ +pageNumber}`} className="next-page">Sau</Link>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default Catalog;

export const Pagination = ({ category, pageNumber, className }) => {
  let pNumber = [];
  if (pageNumber >= 3) {
    pNumber = [-2, -1, 0, 1, 2];
  } else if (pageNumber < 3 && pageNumber >= 2) {
    pNumber = [-1, 0, 1, 2, 3];
  } else if (pageNumber < 2) {
    pNumber = [0, 1, 2, 3, 4];
  }
  return (
    <ul className={className}>
      {pNumber.map((e, i) => {
        const nb = e + +pageNumber;
        if (nb > 0) {
          return (
            <li className={pageNumber == nb ? "active" : ""} key={i}>
              <Link to={`/${category}/page/${nb}`}>{nb}</Link>
            </li>
          );
        }
      })}
    </ul>
  );
};
