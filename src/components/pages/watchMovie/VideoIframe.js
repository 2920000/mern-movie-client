import React from 'react'

function VideoIframe({category,movieId,season,episode}) {
  return (
    <>
         <div className="video">
                  {category === "movie" ? (
                    <iframe
                      className="iframe"
                      width="100%"
                      src={`https://www.2embed.ru/embed/tmdb/movie?id=$1{movieId}`}
                      title="video"
                    />
                  ) : (
                    <iframe
                      className="iframe"
                      title="video"
                      width="100%"
                      src={`https://www.2embed.ru/embed/tmdb/tv?id=$1{movieId} ID&s=${season} NUMBER&e=${episode} NUMBER`}
                    />
                  )}
                </div>
    </>
  )
}

export default VideoIframe