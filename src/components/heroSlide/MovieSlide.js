import apiConfig from "../../api/apiConfig";
import Button from "../button/Button";

const MovieSlide = ({ e, navigate }) => {
    const backgroundHero = apiConfig.originalImage(e.backdrop_path);
   
    return (
      <div className="hero-item">
        <div
          className="placeholder"
          style={{ backgroundImage: `url(${backgroundHero})` }}
        ></div>
        <div className="container">
          <div className="hero-item__infor">
            <h4 className="hero-item-title">{e.title}</h4>
            <p className="hero-item-rated"> <span className="imdb">IMDB</span> {e.vote_average}</p>
            <p className="hero-item-summary">{e.overview}</p>
            <Button
              watch={true}
              onClick={() => {
                navigate(`/watch/movie/${e.id}`);
              }}
              movieId={e.id}
              className="large hover"
            >
              Xem phim
            </Button>
          </div>
        </div>
      </div>
    );
  };
  
  export default MovieSlide