import React, { useEffect } from "react";
import PostComponent from "../postComponent/PostComponent.jsx";
import CommentComponent from "../commentComponent/CommentComponent.jsx";
import "./StatusComponent.css";
import { getComments } from "../../actions/CommentAction";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import CreateCommentComponent from "../createCommentComponent/CreateCommentComponent.jsx";

const StatusComponent = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  let { posts } = useSelector((state) => state.postReducer);
  const post = posts.find((x) => x._id === params.id);
  let { comments, loading } = useSelector((state) => state.commentReducer);
  useEffect(() => {
    dispatch(getComments(params.id));
  }, [location.pathname, posts.length]);
  return (
    <div className="Status">
      <PostComponent post={post} key={post ? post.id : ""} />
      <CreateCommentComponent />
      <div className="Comments">
        {loading
          ? "Loading comments"
          : comments.map((comment) => {
              return <CommentComponent comment={comment} key={comment._id} />;
            })}
      </div>
    </div>
  );
};

export default StatusComponent;
