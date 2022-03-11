import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import apiConfig from "../../../../api/apiConfig";
import Button from "../../../button/Button";

function PosterMovieDetail({ movieDetail, category, setShowSeason }) {
  const navigate = useNavigate();

  const handleShowChoices = () => {
    setShowSeason(true);
  };

  return (
    <>
      <img
        className="infor-left-image"
        src={apiConfig.w500Image(movieDetail.poster_path)}
        alt=""
      />
      {category === "movie" ? (
        <Button
          onClick={() => {
            navigate(`/watch/${category}/${movieDetail.id}`);
          }}
          className="btn-detail-movie"
        >
          <BsFillPlayFill className="btn-detail-movie-icon" /> XEM PHIM
        </Button>
      ) : (
        <>
          {movieDetail.seasons.length > 1 ? (
            <Button className="btn-detail-movie" onClick={handleShowChoices}>
              <BsFillPlayFill className="btn-detail-movie-icon" /> XEM PHIM
            </Button>
          ) : (
            <Button
              onClick={() => {
                navigate(`/watch/${category}/${movieDetail.id}/1/1`);
              }}
              className="btn-detail-movie"
            >
              <BsFillPlayFill className="btn-detail-movie-icon" /> XEM PHIM
            </Button>
          )}
        </>
      )}
    </>
  );
}

export default PosterMovieDetail;
