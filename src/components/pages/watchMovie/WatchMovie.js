import React, { useEffect, useState, memo } from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../../../api/apiThemovie";
import Spinner from "../../spinner/Spinner";
import MovieSidebar from "../../movie-sidebar/MovieSidebar";
import "./watch-movie.scss";
import VideoIframe from "./VideoIframe";
import MovieTitleAndEpisode from "./MovieTitleAndEpisode";
import CommentBox from "./CommentBox";
function WatchMovie() {
  const { category, movieId, season, episode } = useParams();
  const [detail, setDetail] = useState();
  const [detailEachSeason, setDetailEachSeason] = useState({});
  const [load, setLoad] = useState(false);

  const videoIframeProps = {
    category,
    movieId,
    season,
    episode,
  };
  const movieTitleAndEpisode = {
    detail,
    detailEachSeason,
    season,
    movieId,
    episode,
  };

  const movieSidebarProps = {
    className: "watch-sidebar",
    type: "similar",
    categorySidebar: category,
    movieId,
  };
  useEffect(() => {
    window.scrollTo(0,0)
    const params = {
      language: "vi-VN",
    };

    const fetchData = async () => {
      const response = await tmdbApi.getMovieDetail(category, movieId, {
        params,
      });
      if (season) {
        const filterSeason = response.seasons.find(
          (e) => e.season_number == season
        );
        setDetailEachSeason(filterSeason);
      }
      setDetail(response);
      setTimeout(() => {
        setLoad(true);
      }, 500);
    };
    fetchData();
    return () => {
      setLoad(false);
    };
  }, [episode]);

  return (
    <>
      {load ? (
        <div className="watch">
          <div className="container-movie">
            <div className="watch-flex">
              <div className="watch-left">
                <VideoIframe {...videoIframeProps} />
                <MovieTitleAndEpisode {...movieTitleAndEpisode} />
                <CommentBox movieId={movieId} episode={episode} />
              </div>
              <div className="watch-right">
                <MovieSidebar {...movieSidebarProps} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default memo(WatchMovie);
