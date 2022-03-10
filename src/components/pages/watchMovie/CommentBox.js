import React, { useState, useEffect, useRef } from "react";
import { BsChatRightText } from "react-icons/bs";
import { BiTimeFive, BiChevronDown } from "react-icons/bi";
import timeTranslate from "./timeStranslate";
import CommentForm from "./CommentForm";
import axios from "axios";
import moment from "moment";

function CommentBox({ movieId, episode }) {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("profile"))
  );
  const [comments, setComments] = useState([]);
  const [showReplyInput, setShowReplyInput] = useState(false);

  useEffect(() => {
    const fetchComment = async () => {
      const comments = await axios.get(
        `https://movie-app-lethanh.herokuapp.com/movie/${movieId}`
      );
      setComments(comments.data.reverse());
    };
    fetchComment();
  }, [episode]);

  // hiển thị số comment reply
  const handleShowReply = async (index, commentId) => {
    setShowReplyInput(commentId);
    document.querySelector(`#p${index}`).classList.add("block");
    document.querySelector(`#n${index}`).classList.add("hidden");
  };

  
  return (
    <>
      <div className="comments-box">
        <p>Bình luận</p>
        <span>{comments.length} bình luận</span>
        {user ? (
          <CommentForm
            user={user}
            movieId={movieId}
            setComments={setComments}
            comments={comments}
          />
        ) : (
          <CommentForm type="notSignin" />
        )}
        <div className="comments-infor">
          {comments.map((commentUser, index) => (
            <div className="comment-item" key={index}>
              <div className="comment-left">
                {commentUser.avatar ? (
                  <img
                    className="comment-image"
                    src={commentUser.avatar}
                    alt=""
                  />
                ) : (
                  <div>
                    <img
                      className="user-customAvatar"
                      src="https://p1.hiclipart.com/preview/110/885/214/green-circle-child-avatar-user-profile-smile-boy-cartoon-face-png-clipart.jpg"
                      alt=""
                    />
                  </div>
                )}
              </div>
              <div className="comment-right">
                <span className="comment-user">
                  {commentUser.userName || commentUser}
                </span>
                <span className="comment-text">{commentUser.message}</span>

                <div className="comment-replyAndTime">
                  <span
                    onClick={() => {
                      handleShowReply(index, commentUser.commentId);
                    }}
                    className="comment-reply"
                  >
                    <BsChatRightText /> Trả lời
                  </span>
                  <span className="comment-time">
                    <BiTimeFive />{" "}
                    {timeTranslate(moment(commentUser.createAt).toNow(true))}
                  </span>
                </div>
                {commentUser.reply.length >= 1 && (
                  <span
                    onClick={() => {
                      handleShowReply(index, commentUser.commentId);
                    }}
                    id={`n${index}`}
                    className={`reply-total`}
                  >
                    <BiChevronDown />
                    {commentUser.reply.length} trả lời
                  </span>
                )}
                {
                  <ul id={`p${index}`} className="reply-comments-list">
                    {commentUser.reply.map((reply, index) => (
                      <li key={index} className="reply-comment-item">
                        <div className="comment-left-reply">
                          {reply.avatar ? (
                            <img
                              className="comment-image-reply"
                              src={reply.avatar}
                              alt=""
                            />
                          ) : (
                            <div>
                              <img
                                className="user-customAvatar-reply"
                                src="https://p1.hiclipart.com/preview/110/885/214/green-circle-child-avatar-user-profile-smile-boy-cartoon-face-png-clipart.jpg"
                                alt=""
                              />
                            </div>
                          )}
                        </div>
                        <div className="comment-right">
                          <span className="comment-user">{reply.userName}</span>
                          <span className="comment-text">
                            {reply.replyComment}
                          </span>
                          <div className="comment-replyAndTime">
                            <span
                              onClick={() => {
                                handleShowReply(index, commentUser.commentId);
                              }}
                              className="comment-reply"
                            >
                              <BsChatRightText /> Trả lời
                            </span>
                            <span className="comment-time">
                              <BiTimeFive />{" "}
                              {timeTranslate(
                                moment(reply.createAt).toNow(true)
                              )}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                    {showReplyInput === commentUser.commentId && (
                      <ReplyForm
                        commentUser={commentUser}
                        comments={comments}
                        setComments={setComments}
                        user={user}
                        movieId={movieId}
                      />
                    )}
                  </ul>
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CommentBox;




const ReplyForm = ({ commentUser, comments, setComments, user, movieId }) => {
  const [replyInput, setReplyInput] = useState("");

  const handleReply = async (e, commentId) => {
    e.preventDefault();
    const createAt = moment();
    const replyComment = await axios({
      method: "post",
      url: `https://movie-app-lethanh.herokuapp.com/movie/${movieId}/reply`,
      data: {
        commentId: commentId,
        userName: user.result.signinName || user.result.name,
        avatar: user.result.imageUrl || null,
        replyComment: replyInput,
        createAt,
      },
    });
    setReplyInput("");
    const findComment = comments.find(
      (comment) => comment.commentId === commentId
    );
    findComment.reply.push(replyComment.data);
    setComments([...comments]);
  };

  return (
    <form>
      <input
        value={replyInput}
        onChange={(e) => {
          setReplyInput(e.target.value);
        }}
        autoFocus
        className="reply-input"
      />
      <button
        onClick={(e) => {
          handleReply(e, commentUser.commentId, commentUser.reply);
        }}
      ></button>
    </form>
  );
};
