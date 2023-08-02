import React, { useEffect, useState } from "react";
import "./PostComponent.css";
import { UilHeart } from "@iconscout/react-unicons";
import { UilCommentAltLines } from "@iconscout/react-unicons";
import { useSelector } from "react-redux";
import { likePost } from "../../api/LikeRequest";
import { Link, useLocation, useParams } from "react-router-dom";
import * as UserApi from "../../api/UserRequest";

const PostComponent = ({ post }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(post.likes.includes(user._id));
  const [likes, setLikes] = useState(post.likes.length);
  const [postUser, setpostUser] = useState([]);
  const comments = useState(post.comments.length);
  const params = useParams();
  const { pathname } = useLocation();

  const handleLike = () => {
    setLiked((prev) => !prev);
    likePost(user._id, post._id);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };
  const date = new Date(post.createdAt).toLocaleDateString([], {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await UserApi.getUser(post.userId);
      setpostUser(data);
    };
    fetchUser();
  }, []);

  if (
    params.id &&
    params.id !== postUser.username &&
    pathname === "/profile/" + params.id
  ) {
    return "";
  }

  if (post.parent) {
    return "";
  }
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
          <span className="username"> @{postUser.username}</span>
        </div>
      </Link>
      <Link
        style={{ textDecoration: "none", color: "inherit" }}
        to={`/status/${post._id}`}
        className="Post-Content"
      >
        <div className="desc">
          <span>{post.desc}</span>
        </div>
        <img
          src={
            post.image ? process.env.REACT_APP_PUBLIC_FOLDER + post.image : ""
          }
          alt=""
          hidden={!post.image}
        />
      </Link>
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
        <div className="option comment">
          <UilCommentAltLines />
          <span>{comments}</span>
        </div>
      </div>
    </div>
  );
};

export default PostComponent;
