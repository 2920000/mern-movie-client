import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../../../api/apiThemovie";
import SeasonSelection from "./SeasonSelection";
import apiConfig from "../../../api/apiConfig";
import Spinner from "../../spinner/Spinner";
import Trailer from "../../trailer/Trailer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./movie-detail.scss";
import { Cast } from "./Cast/Cast";
import MovieInfor from "./movie-infor/MovieInfor";
import PosterMovieDetail from "./poster-movie-detail/PosterMovieDetail";
import titleFucntion from "../../../title/titleFucntion";
function MovieDetail() {
  const { category, movieId } = useParams();
  const [load, setLoad] = useState(false);
  const [movieDetail, setMovieDetail] = useState({});
  const [movieCredits, setMovieCredits] = useState([]);
  const [showSeason, setShowSeason] = useState(false);

  const posterMovieDetailProps = {
    movieDetail,
    category,
    setShowSeason,
  };

  const seasonSelectionProps = {
    movieId: movieDetail.id,
    seasons: movieDetail.seasons,
    setShowSeason,
    load,
  };
 useEffect(()=>{
 if( movieDetail.name||movieDetail.title){
  document.title=titleFucntion((movieDetail.title||movieDetail.name),'movie-detail')
 }
 })
  useEffect(() => {
    
    window.scrollTo(0, 0);
    const params = {
      language: "vi-VN",
    };
    const fetchData = async () => {
      const response = await tmdbApi.getMovieDetail(category, movieId, {
        params,
      });
      const response1 = await tmdbApi.getMovieCredits(category, movieId, {
        params,
      });
      const cast = response1.cast.slice(0, 6);
      setMovieDetail(response);
      setMovieCredits(cast);
      setLoad(true);
    };
    fetchData();
  }, []);
 
  return (
    <>
      {load ? (
        <div className="movie-detail">
          <HeroMovieDetail movieDetail={movieDetail} />
          <div className="movie-detail__infor">
            <div className="container-movie">
              <section className="infor-flex">
                <div className="infor-left">
                  <PosterMovieDetail {...posterMovieDetailProps} />
                </div>
                <div className="infor-right">
                  <MovieInfor movieDetail={movieDetail} />
                  <Cast movieCredits={movieCredits} />
                </div>
              </section>
              <div className="trailer">
                <Trailer category={category} id={movieId} />
              </div>
            </div>
          </div>
          {showSeason && <SeasonSelection {...seasonSelectionProps} />}
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default MovieDetail;

const HeroMovieDetail = ({ movieDetail }) => {
  return (
    <div className="movie-detail__hero">
      <img
        className="movie-detail__hero__backdrop"
        src={apiConfig.originalImage(movieDetail.backdrop_path)}
        alt=""
      />
    </div>
  );
};
