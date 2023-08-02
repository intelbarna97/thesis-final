import React, { useEffect } from "react";
import "./PostsComponent.css";
import Post from "../postComponent/PostComponent.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getTimelinePosts, getUserPosts } from "../../actions/PostAction";
import { useLocation, useParams } from "react-router-dom";

const PostsComponent = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  useEffect(() => {
    location.pathname === "/home"
      ? dispatch(getTimelinePosts(user._id))
      : dispatch(getUserPosts(params.id));
  }, [location, posts.length]);
  if (!posts) return "No posts";
  return (
    <div className="Posts">
      {loading
        ? "Loading posts"
        : posts.map((post, id) => {
            return <Post post={post} key={id} />;
          })}
    </div>
  );
};

export default PostsComponent;
