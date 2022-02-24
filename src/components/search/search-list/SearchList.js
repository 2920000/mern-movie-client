import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../../../api/apiThemovie";
import Poster from "../../poster-movie/Poster";
import "./search-list.scss";
function SearchList() {
  const [moviesSearch, setMovieSearch] = useState([]);
  const { keyword } = useParams();
  useEffect(() => {
    const params = {
      query: keyword,
    };
    const fetchData = async () => {
      if (keyword !== undefined) {
        const response = await tmdbApi.search({ params });
        setMovieSearch(response.results);
      }
    };
    fetchData();
  }, [keyword]);

  return (
    <div className="search-list">
      {moviesSearch.map((e) => {
        if (e.poster_path) {
          return (
            <div className="poster" key={e.id}>
              <Poster className='grid' e={e} />
            </div>
          );
        }
      })}
    </div>
  );
}

export default SearchList;
