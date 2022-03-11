import React, { useState } from "react";
import MovieSidebar from "../../movie-sidebar/MovieSidebar";

function HomeMainRight() {
  const [category, setCategory] = useState("movie");

  const handleSwitch = (value) => {
    setCategory(value);
  };
  return (
    <div className="home-right">
      <h2 className="home-right-title">BẢNG XẾP HẠNG</h2>
      <div className="home-right-movie__sidebar">
        <div className="trending-catalog">
          <h4
            className="trending-catalog__movie"
            style={
              category === "movie"
                ? { borderBottom: "3px solid red" }
                : { borderBottom: "3px solid #06121e" }
            }
            onClick={() => {
              handleSwitch("movie");
            }}
          >
            PHIM LẺ
          </h4>
          <h4
            className="trending-catalog__tv"
            style={
              category === "tv"
                ? { borderBottom: "3px solid red" }
                : { borderBottom: "3px solid #06121e" }
            }
            onClick={() => {
              handleSwitch("tv");
            }}
          >
            PHIM BỘ
          </h4>
        </div>
        <div className="trending">
          <MovieSidebar categorySidebar={category} className="home-sidebar" />
        </div>
      </div>
    </div>
  );
}

export default HomeMainRight;
