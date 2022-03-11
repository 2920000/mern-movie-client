import moment from 'moment';
import React, { useState } from 'react'
import { postReplyComment } from '../../../api-mongoose';

 const ReplyForm = ({ commentUser, comments, setComments, user, movieId ,focusInputRef}) => {
    const [replyInput, setReplyInput] = useState("");
    const handleReply = (e, commentId) => {
      e.preventDefault();
      const createAt = moment();
      setReplyInput("");
      const payload={
        commentId: commentId,
        userName: user.result.signinName || user.result.name,
        avatar: user.result.imageUrl || null,
        replyComment: replyInput,
        createAt,
      }
      const findComment = comments.find(
        (comment) => comment.commentId === commentId
      );
      
      findComment.reply.push(payload);
      setComments([...comments]);
      postReplyComment(payload,movieId)
     
    };
  
    return (
      <form>
        <input
          value={replyInput}
          onChange={(e) => {
            setReplyInput(e.target.value);
          }}
          ref={focusInputRef}
          className="reply-input"
          autoFocus
        />
        <button
          onClick={(e) => {
            handleReply(e, commentUser.commentId, commentUser.reply);
          }}
        ></button>
      </form>
    );
  };
  

export default ReplyForm