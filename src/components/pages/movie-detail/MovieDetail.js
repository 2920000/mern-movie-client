import React, { useEffect, useState} from "react";
import tmdbApi from "../../../api/apiThemovie";
import apiConfig from "../../../api/apiConfig";
import { useParams } from "react-router-dom";
import Spinner from "../../spinner/Spinner";
import Button from "../../button/Button";
import { useNavigate } from "react-router-dom";
import Trailer from "../../trailer/Trailer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./movie-detail.scss";
import SeasonSelection from "./SeasonSelection";
function MovieDetail() {
  const { category, movieId } = useParams();
  const [load, setLoad] = useState(false);
  const [movieDetail, setMovieDetail] = useState({});
  const [movieCredits, setMovieCredits] = useState([]);
  const [showSeason,setShowSeason]=useState(false)
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    const params = {};
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
  console.log('render');
  const handleShowChoices=()=>{
setShowSeason(true)
  }
  return (
    <>
      {load ? (
        <div className="movie-detail">
          <div className="movie-detail__hero">
            <img
              className="movie-detail__hero__backdrop"
              src={apiConfig.originalImage(movieDetail.backdrop_path)}
              alt=""
            />
          </div>
          <div className="movie-detail__infor">
            <div className="container-movie">
              <section className="infor-flex">
                <div className="infor-left">
                  <img
                    className="infor-left-image"
                    src={apiConfig.originalImage(movieDetail.poster_path)}
                    alt=""
                  />
                 {category==='movie'?
                 <Button
                    onClick={() => {
                      navigate(`/watch/${category}/${movieDetail.id}}`);
                    }}
                    className="btn-detail-movie"
                  >
                    Watch
                  </Button>
                  :<>
                    {movieDetail.seasons.length>1
                    ?<Button className="btn-detail-movie" onClick={handleShowChoices}>Watch</Button>
                    : <Button
                    onClick={() => {
                      navigate(`/watch/${category}/${movieDetail.id}}/1/1`);
                    }}
                    className="btn-detail-movie"
                  >
                    Watch
                  </Button>}
                  </>}
                </div>
                <div className="infor-right">
                  <div className="infor-movie">
                    <h3>{movieDetail.name || movieDetail.title}</h3>
                    <h4>{movieDetail.name || movieDetail.title}({movieDetail.release_date&&movieDetail.release_date.slice(0,4)}{movieDetail.first_air_date&&movieDetail.first_air_date.slice(0,4)})</h4>
                    {movieDetail.runtime&&<span className="time">Runtime {movieDetail.runtime}</span>}
                    <span>
                      <span className="imdb">IMDB</span>{" "}
                      <span className="score">{movieDetail.vote_average}</span>
                    </span>
                    <p className="genres">
                      {movieDetail.genres ? (
                        <>
                          {movieDetail.genres.map((genre) => (
                            <span key={genre.id}>{genre.name}</span>
                          ))}
                        </>
                      ) : (
                        ""
                      )}
                    </p>
                  </div>
                  <div className="more-infor-movie">
                    <p>
                      COUNTRY{" "}
                      <span className="country">
                        {movieDetail.production_countries.map((country, i) => (
                          <span key={i}>{country.name}</span>
                        ))}
                      </span>{" "}
                    </p>
                    <p>
                      PREMIERE{" "}
                      <span className="premiere">
                        {movieDetail.first_air_date || movieDetail.release_date}
                      </span>
                    </p>
                    <p className="overview">{movieDetail.overview}</p>
                  </div>
                  <div className="cast">
                   <h3 className='cast-title'>CAST</h3>
                    <Cast movieCredits={movieCredits} />
                   
                  </div>
                </div>
              </section>
              <div className="trailer">
                <Trailer category={category} id={movieId} />
              </div>
            </div>
          </div>
          {showSeason&&<SeasonSelection movieId={movieDetail.id} seasons={movieDetail.seasons} setShowSeason={setShowSeason} load={load} />}
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default MovieDetail;

export const Cast = ({ movieCredits }) => {
  const settings={
    dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 2,
      responsive: [
        {
          breakpoint: 1270,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 2,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 1100,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        }
      ]
  }
  return (
    <Slider {...settings}>
      {movieCredits.map((cast) => (
        <div className="cast-profile" key={cast.id}>
          <img
            className="cast-image"
            src={apiConfig.originalImage(cast.profile_path)}
            alt=""
          />
          <span className="cast-name">{cast.name}</span>
          <span className="cast-name-character">{cast.character}</span>
        </div>
      ))}
    </Slider>
  );
};
