import React, { useEffect, useState } from "react";
import "./watch-movie.scss";
import { Link, useParams } from "react-router-dom";
import tmdbApi from "../../../api/apiThemovie";
import Spinner from "../../spinner/Spinner";
import MovieSidebar from '../../movie-sidebar/MovieSidebar'
function WatchMovie() {
  const { category, movieId, season, episode } = useParams();
  const [detail, setDetail] = useState();
  const [detailEachSeason, setDetailEachSeason] = useState({});
  const [movieSimilar,setMovieSimilar]=useState([])
  const [load, setLoad] = useState(false);
  useEffect(() => {
    const params = {
    };

    const fetchData = async () => {
      const response = await tmdbApi.getMovieDetail(category, movieId, {
        params,
      });
      console.log(response)
      const response2= await tmdbApi.getMovieSimilar(category,movieId,{params})
      setMovieSimilar(response2.results)
      if (season) {
        const filterSeason = response.seasons.find(
          (e) => e.season_number == season
        );
        // setDetail(filterSeason);
        setDetailEachSeason(filterSeason)
      } 
      setDetail(response)
      setLoad(true);
    };
    fetchData();
  }, []);
  console.log(detail)
  return (
    <>
      {load ? (
        <div className="watch">
          <div className="container-movie">
            <div className="watch-flex">
              <div className="watch-left">
                <iframe className="iframe" title="video"   />
                {/* {category === "movie" ? (
                  <iframe
                    width="100%"
                    height="550px"
                    src={`https://www.2embed.ru/embed/tmdb/movie?id=${movieId}`}
                  />
                ) : (
                  <iframe
                    width="100%"
                    height="550px"
                    src={`https://www.2embed.ru/embed/tmdb/tv?id=${movieId} ID&s=${season} NUMBER&e=${episode} NUMBER`}
                  />
                )} */}
                {season && (
                  <ul className="episode-list">
                    {Array(detailEachSeason.episode_count)
                      .fill()
                      .map((number, i) => (
                        <Link
                          key={i}
                          to={`/watch/tv/${movieId}/${season}/${i + 1}`}
                        >
                          <li
                            style={episode == i + 1 ? { opacity: "0.4" } : {}}
                            className="episode-item"
                          >
                            Tập {i + 1}
                          </li>
                        </Link>
                      ))}
                  </ul>
                )}
                <h3 className="watch-left-title">{detail.title||detail.name} ({detail.release_date&&detail.release_date.slice(0,4)}{detailEachSeason.air_date&&detailEachSeason.air_date.slice(0,4)})</h3>
              </div>
              <div className="watch-right">
              <h3></h3>
                 <MovieSidebar  className='watch-sidebar' type='similar' categorySidebar={category} movieId={movieId} />
              </div>
            </div>
          </div>
        </div>
      )
      :<Spinner/>}
    </>
  );
}

export default WatchMovie;
