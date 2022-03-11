import React from 'react'
import { Link } from 'react-router-dom'
import titleFucntion from '../../../title/titleFucntion'

function MovieTitleAndEpisode({detail,detailEachSeason,season,movieId,episode}) {
  document.title=titleFucntion(detail.title||detail.name,'movie-watch')
  console.log(detail)
  return (
    <>
          <h3 className="watch-left-title-english">
                  {detail.title || detail.name}
                </h3>
                <h2 className="watch-left-title-vietnamese">
                  {detail.original_title || detail.original_name}(
                  {detail.release_date && detail.release_date.slice(0, 4)}
                  {detailEachSeason.air_date &&
                    detailEachSeason.air_date.slice(0, 4)}
                  )
                </h2>
                <div className="episode">
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
                </div>

    </>
  )
}

export default MovieTitleAndEpisode