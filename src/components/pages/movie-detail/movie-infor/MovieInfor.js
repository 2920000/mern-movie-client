import React from 'react'
function MovieInfor({movieDetail}) {
  return (
    <div><div className="infor-movie">
    <h3>{movieDetail.original_title || movieDetail.original_name}</h3>
    <h4>
      {movieDetail.name || movieDetail.title}(
      {movieDetail.release_date &&
        movieDetail.release_date.slice(0, 4)}
      {movieDetail.first_air_date &&
        movieDetail.first_air_date.slice(0, 4)}
      )
    </h4>
    {movieDetail.runtime && (
      <span className="time">
        {movieDetail.runtime} phút
      </span>
    )}
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
      QUỐC GIA {" "}
      <span className="country">
        {movieDetail.production_countries.map((country, i) => (
          <span key={i}>{country.name}</span>
        ))}
      </span>{" "}
    </p>
    <p>
      KHỞI CHIẾU {" "}
      <span className="premiere">
        {movieDetail.first_air_date || movieDetail.release_date}
      </span>
    </p>
    <p className="overview">{movieDetail.overview}</p>
  </div></div>
  )
}

export default MovieInfor