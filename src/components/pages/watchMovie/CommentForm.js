import {useState} from 'react'
import { postComment } from '../../../api-mongoose';
import {v4 as uuid} from 'uuid'
import moment from 'moment';
import LoginModal from '../../header/LoginModal';
const CommentForm = (props) => {
    const { type, user, movieId, setComments, comments } = props;
    const [input, setInput] = useState("");
    const [loginModal, setLoginModal] = useState(false);
  
    const handleSubmitComment = async (e) => {
      setInput("");
      const createAt = moment();
      e.preventDefault();
      const payload={
        commentId: uuid(),
        movieId: movieId,
        userName: user.result.signinName || user.result.name,
        avatar: user.result.imageUrl || null,
        message: input,
        createAt,
        reply:[]
      }
      setComments([
        payload,
        ...comments,
      ]);
     postComment(payload)
    };
    // hiển thị phần login
    const handleShowModalLogin = () => {
      setLoginModal(true);
    };
  
    if (type === "notSignin") {
      return (
        <div className="comment-form">
          <div onClick={handleShowModalLogin}>Đăng nhập để bình luận</div>
          <LoginModal loginModal={loginModal} setLoginModal={setLoginModal} />
        </div>
      );
    }
    return (
      <>
        <form className="comment-form">
          <span>
            {user.result.imageUrl ? (
              <img className="user-avatar" src={user.result.imageUrl} alt="" />
            ) : (
              <div>
                <img
                  className="user-customAvatar"
                  src="https://p1.hiclipart.com/preview/110/885/214/green-circle-child-avatar-user-profile-smile-boy-cartoon-face-png-clipart.jpg"
                  alt=""
                />
              </div>
            )}
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
      </>
    );
  };

  export default CommentForm