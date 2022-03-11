import moment from 'moment';
import React, { useState } from 'react'
import { postReplyComment } from '../../../api-mongoose';

 const ReplyForm = ({ commentUser, comments, setComments, user, movieId }) => {
    const [replyInput, setReplyInput] = useState("");
  
    const handleReply = async (e, commentId) => {
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
      const replyComment = await postReplyComment(payload,movieId)
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
  

export default ReplyForm