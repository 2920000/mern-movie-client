import { useNavigate } from "react-router-dom";
import { movieType } from "../../../api/apiThemovie";
import Button from "../../button/Button";
import MovieList from "../../movie-list/MovieList";

const HomeMainLeft = () => {
  const navigate = useNavigate();

  const mainCatalogList = [
    {
      catalog: "PHIM PHỔ BIẾN",
      type: movieType.popular,
    },
    {
      catalog: "PHIM SẮP CHIẾU",
      type: movieType.upcoming,
    },
    {
      catalog: "TOP PHIM ĐÁNH GIÁ CAO",
      type: movieType.top_rated,
    },
  ];

  return (
    <div className="home-left">
      {mainCatalogList.map((e, i) => (
        <section key={i} id={e.type} className="home-left-list">
          <div className="catalog">
            <h3>{e.catalog}</h3>
            <Button
              onClick={() => {
                navigate(`${e.type}/page/1`);
              }}
              className="small hover"
            >
              Xem tất cả
            </Button>
          </div>
          <MovieList className="movie-list" type={e.type} />
        </section>
      ))}
    </div>
  );
};

export default HomeMainLeft;
