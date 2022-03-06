import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Poster from "../../poster-movie/Poster";
import Spinner from "../../spinner/Spinner";
import tmdbApi from "../../../api/apiThemovie";
import "./genres.scss";
function Genres() {
  const [movieByGenre, setMovieByGenre] = useState([]);
  const [load, setLoad] = useState(false);

  const { genreNumber } = useParams();

  let type = null;

  switch (genreNumber) {
    case '28':
      type = "HÀNH ĐỘNG"
      break
    case '12':
      type = "PHIÊU LƯU"
      break
    case '16':
      type = "HOẠT HÌNH"
      break
    case '35':
      type = "HÀI HƯỚC"
      break
    case '80':
      type = "TỘI PHẠM"
      break
    case '18':
      type = "KỊNH TÍNH"
      break
    case '14':
      type = "ẢO TƯỞNG"
      break;
    default:
  }

  const params = {
    with_genres: genreNumber,
    language:'vi-VN'
  };
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await tmdbApi.getMovieDiscover({ params });
      setMovieByGenre(response.results);
      setLoad(true);
    };
    fetchData();
  }, [genreNumber]);
  return (
    <>
      {load ? (
        <div className="genre-movie">
          <h3 className="genre-movie-title">{type}</h3>
          <div className="genre-movie-grid">
            {movieByGenre.map((e) => (
              <div key={e.id} className="poster" >
                <Poster e={e} type='movie' />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default Genres;
