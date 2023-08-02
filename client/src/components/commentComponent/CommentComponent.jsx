import React, { useEffect, useState } from "react";
import "./CommentComponent.css";
import { UilHeart } from "@iconscout/react-unicons";
import { UilCommentAltLines } from "@iconscout/react-unicons";
import { useSelector } from "react-redux";
import { likePost } from "../../api/LikeRequest";
import { Link } from "react-router-dom";
import * as UserApi from "../../api/UserRequest";

const CommentComponent = ({ comment }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(comment.likes.includes(user._id));
  const [likes, setLikes] = useState(comment.likes.length);
  const [postUser, setpostUser] = useState([]);
  const comments = useState(comment.comments.length);

  const handleLike = () => {
    setLiked((prev) => !prev);
    likePost(user._id, comment._id);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };
  const date = new Date(comment.createdAt).toLocaleDateString([], {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await UserApi.getUser(comment.userId);
      setpostUser(data);
    };
    fetchUser();
  }, []);
  return (
    <div className="Post">
      <Link
        style={{ textDecoration: "none", color: "inherit" }}
        to={`/profile/${postUser.username}`}
      >
        <div className="detail">
          <span>
            <b>{postUser.name}</b>
          </span>
          <span className="username">@{postUser.username}</span>
        </div>
      </Link>
        <div className="desc">
          <span>{comment.desc}</span>
        </div>
        <img
          src={
            comment.image
              ? process.env.REACT_APP_PUBLIC_FOLDER + comment.image
              : ""
          }
          alt=""
          hidden={!comment.image}
        />
      <div className="date">
        <span>{date}</span>
      </div>
      <div className="PostReaction">
        <div
          className="option like"
          style={liked ? { color: "var(--red)" } : {}}
        >
          <UilHeart className="like-icon" onClick={handleLike} />
          <span>{likes}</span>
        </div>
      </div>
    </div>
  );
};

export default CommentComponent;
