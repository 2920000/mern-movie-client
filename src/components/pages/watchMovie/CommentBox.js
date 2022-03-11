import React, { useState, Suspense,lazy } from "react";
import CommentForm from "./CommentForm";
const AllComments=lazy(()=>{
  return new Promise(resolve=>{
    setTimeout(()=>resolve(import('./AllComments')),300)
  })
})
function CommentBox({ movieId, episode }) {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("profile"))
  );
  const [comments, setComments] = useState([]);
 
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
               <Suspense fallback={<div className="comments-loading"></div>}>
                  <AllComments setUser={setUser} user={user} movieId={movieId} episode={episode} comments={comments} setComments={setComments}  />
               </Suspense>
        </div>
      </div>
    </>
  );
}

export default CommentBox;




