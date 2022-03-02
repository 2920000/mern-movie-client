import React, { useEffect, useState, memo } from "react";
import { Link, useParams } from "react-router-dom";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { v4 as uuid } from "uuid";
import tmdbApi from "../../../api/apiThemovie";
import Spinner from "../../spinner/Spinner";
import MovieSidebar from "../../movie-sidebar/MovieSidebar";
import LoginMoal from "../../header/LoginModal";
import "./watch-movie.scss";
function WatchMovie() {
  const { category, movieId, season, episode } = useParams();
  const [detail, setDetail] = useState();
  const [detailEachSeason, setDetailEachSeason] = useState({});
  const [user, setUser] = useState({});
  const [input, setInput] = useState("");
  const [load, setLoad] = useState(false);
  const [dataFromFirebase, setDataFromFirebase] = useState([]);
  const [loginModal, setLoginModal] = useState(false);

  const auth = getAuth();
  useEffect(() => {
    const params = {};

    const fetchData = async () => {
      const response = await tmdbApi.getMovieDetail(category, movieId, {
        params,
      });
      if (season) {
        const filterSeason = response.seasons.find(
          (e) => e.season_number == season
        );
        setDetailEachSeason(filterSeason);
      }
      setDetail(response);
      setTimeout(() => {
        setLoad(true);
      }, 500);
    };
    fetchData();
    return () => {
      setLoad(false);
    };
  }, [episode]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    onSnapshot(doc(db, "comments", movieId), (doc) => {
      setDataFromFirebase([...doc.data().comments]);
    });
  }, []);
  console.log(detail);
  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (dataFromFirebase[0] === undefined) {
      setDoc(doc(db, "comments", movieId), {
        comments: [
          {
            commentId: uuid(),
            userName: user.displayName,
            userPhoto: user.photoURL,
            reply: [],
            comment: input,
          },
        ],
      });
    } else {
      updateDoc(doc(db, "comments", movieId), {
        comments: [
          ...dataFromFirebase,
          {
            commentId: uuid(),
            userName: user.displayName,
            userPhoto: user.photoURL,
            comment: input,
            reply: [],
          },
        ],
      });
    }
    setInput("");
  };
  const handleShowModalLogin = () => {
    setLoginModal(true);
  };

  return (
    <>
      {load ? (
        <div className="watch">
          <div className="container-movie">
            <div className="watch-flex">
              <div className="watch-left">
                <div className="video">
                  {/* <iframe className="iframe" title="video"   /> */}
                  {category === "movie" ? (
                    <iframe
                      className="iframe"
                      width="100%"
                      src={`https://www.2embed.ru/embed/tmdb/movie?id=${movieId}`}
                      title="video"
                    />
                  ) : (
                    <iframe
                      className="iframe"
                      title="video"
                      width="100%"
                      src={`https://www.2embed.ru/embed/tmdb/tv?id=${movieId} ID&s=${season} NUMBER&e=${episode} NUMBER`}
                    />
                  )}
                </div>
                <h3 className="watch-left-title-english">
                  {detail.title || detail.name} 
                </h3>
                <h2 className="watch-left-title-vietnamese">
                  {detail.original_title||detail.original_name}
                  (
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

                <div className="comments-box">
                  <p>Bình luận</p>
                  <span>{dataFromFirebase.length} comments</span>
                  {user ? (
                    <form className="comment-form">
                      <span>
                        <img
                          className="user-avatar"
                          src={user.photoURL}
                          alt=""
                        />
                      </span>
                      <input
                        value={input}
                        onChange={(e) => {
                          setInput(e.target.value);
                        }}
                        className="input"
                        placeholder="Nhập bình luận"
                      />
                      <button onClick={handleSubmitComment}></button>
                    </form>
                  ) : (
                    <div className="comment-form">
                      <div onClick={handleShowModalLogin}>
                        Đăng nhập để bình luận
                      </div>
                      <LoginMoal
                        loginModal={loginModal}
                        setLoginModal={setLoginModal}
                      />
                    </div>
                  )}
                  <div className="comments-infor">
                    {dataFromFirebase.map((commentUser) => (
                      <div className="comment-item" key={commentUser.commentId}>
                        <div className="comment-left">
                          <img
                            className="comment-image"
                            src={commentUser.userPhoto}
                            alt=""
                          />
                        </div>
                        <div className="comment-right">
                          <span className="comment-user">
                            {commentUser.userName}
                          </span>
                          <span className="comment-text">
                            {commentUser.comment}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="watch-right">
                <h3></h3>
                <MovieSidebar
                  className="watch-sidebar"
                  type="similar"
                  categorySidebar={category}
                  movieId={movieId}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default memo(WatchMovie);
