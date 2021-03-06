import React, { useState, useEffect, useRef } from "react";
import { BiChevronDown, BiTimeFive } from "react-icons/bi";
import { BsChatRightText } from "react-icons/bs";
import { getComments } from "../../../api-mongoose";
import timeTranslate from "./timeStranslate";
import moment from "moment";
import ReplyForm from "./ReplyForm";
import AskSignInBox from "../../ask-signin-box/AskSignInBox";
import LoginMoal from "../../header/LoginModal";

function AllComments({
  setUser,
  user,
  movieId,
  episode,
  comments,
  setComments,
}) {

  const [showReplyInput, setShowReplyInput] = useState('');
  const [askSignInBox, setAskSignInBox] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  const focusInputRef=useRef()

  const askSignInBoxProps = {
    setAskSignInBox,
    setLoginModal,
  };
  const loginModalProps = {
    setUser,
    loginModal,
    setLoginModal,
  };
  const replyFormProps = {
    comments,
    setComments,
    user,
    movieId,
    focusInputRef
  };

  useEffect(() => {
    const fetchComment = async () => {
      const comments = await getComments(movieId);
      setComments(comments.data.reverse());
    };
    fetchComment();
  }, [episode]);

  const handleShowReply = async (index) => {
    document.querySelector(`#p${index}`).classList.add("block");
    document.querySelector(`#n${index}`).classList.add("hidden");
  };

  const handleShowReplyWithInput = (index, commentId) => {
    if (user) {
      setShowReplyInput(commentId);
        document.querySelector(`#p${index}`).classList.add("block");
      if( document.querySelector(`#n${index}`)){
        document.querySelector(`#n${index}`).classList.add("hidden");
      }
       if(focusInputRef.current){
        focusInputRef.current.focus()
      }

     
    } else {
      setAskSignInBox(true);
    }
  };
  return (
    <>
      {comments.map((commentUser, index) => (
        <div className="comment-item" key={index}>
          <div className="comment-left">
            {commentUser.avatar ? (
              <img className="comment-image" src={commentUser.avatar} alt="" />
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
                  handleShowReplyWithInput(index, commentUser.commentId);
                }}
                className="comment-reply"
              >
                <BsChatRightText /> Tr??? l???i
              </span>
              <span className="comment-time">
                <BiTimeFive />{" "}
                {timeTranslate(moment(commentUser.createAt).toNow(true))}
              </span>
            </div>
            {(commentUser.reply.length >= 1&&showReplyInput!==commentUser.commentId)&& (
              <span
                onClick={() => {
                  handleShowReply(index, commentUser.commentId);
                }}
                id={`n${index}`}
                className={`reply-total`}
              >
                <BiChevronDown />
                {commentUser.reply.length} tr??? l???i
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
                      <span className="comment-text">{reply.replyComment}</span>
                      <div className="comment-replyAndTime">
                        <span
                          onClick={() => {
                            handleShowReplyWithInput(
                              index,
                              commentUser.commentId
                            );
                          }}
                          className="comment-reply"
                        >
                          <BsChatRightText /> Tr??? l???i
                        </span>
                        <span className="comment-time">
                          <BiTimeFive />{" "}
                          {timeTranslate(moment(reply.createAt).toNow(true))}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
                {showReplyInput === commentUser.commentId && <ReplyForm commentUser={commentUser} {...replyFormProps } />}
              </ul>
            }
          </div>
        </div>
      ))}
      {askSignInBox && <AskSignInBox {...askSignInBoxProps} />}
      {loginModal && <LoginMoal {...loginModalProps} />}
    </>
  );
}

export default AllComments;
