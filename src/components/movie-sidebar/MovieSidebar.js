import React, { useEffect, useState } from "react";
import tmdbApi, { category, tvType } from "../../api/apiThemovie";
import Poster from "../poster-movie/Poster";
import "./movie-sidebar.scss";
function MovieSidebar(props) {
  const { movieId, className, type, categorySidebar } = props;
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const params = {
      language:'vi-VN'
    };
    let response = null;
    const fetchData = async () => {
      if (type === "similar") {
        response = await tmdbApi.getMovieSimilar(categorySidebar, movieId, {
          params,
        });
      } else {
        switch (categorySidebar) {
          case category.movie:
            response = await tmdbApi.getTrendingMoives({ params });
            break;
          default:
            response = await tmdbApi.getTvList(tvType.popular, { params });
        }
      }

      setMovies(response.results.slice(0, 10));
    };
    fetchData();
  }, [categorySidebar]);
  return (
    <div className="movie-sidebar">
      {movies.map((e, i) => (
        <div className="movie-sidebar-poster" key={e.id}>
          <Poster
            type={e.media_type || categorySidebar}
            e={e}
            className={className}
            rank={i + 1}
          />
        </div>
      ))}
    </div>
  );
}

export default MovieSidebar;
