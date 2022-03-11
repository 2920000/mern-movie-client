import React from 'react'

function VideoIframe({category,movieId,season,episode}) {
  return (
    <>
         <div className="video">
                  {category === "movie" ? (
                    <iframe
                      className="iframe"
                      width="100%"
                      height="100%"
                      src={`https://www.2embed.ru/embed/tmdb/movie?id=$1{movieId}`}
                      title="video"
                      allow='fullscreen'
                    />
                  ) : (
                    <iframe
                      className="iframe"
                      title="video"
                      width="100%"
                      allow='fullscreen'
                      src={`https://www.2embed.ru/embed/tmdb/tv?id=${movieId} ID&s=${season} NUMBER&e=${episode} NUMBER`}
                    />
                  )}
                </div>
    </>
  )
}

export default VideoIframe