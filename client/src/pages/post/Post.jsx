import React from "react";
import LeftSide from "../../components/leftSide/LeftSide";
import RightSide from "../../components/rightSide/RightSide";
import "./Post.css";
import StatusComponent from "../../components/statusComponent/StatusComponent";
import BurgerComponent from "../../components/burgerComponent/BurgerComponent";
const Post = () => {
  return (
    <div className="PostPage">
      <BurgerComponent />
      <LeftSide />
      <StatusComponent />
      <RightSide />
    </div>
  );
};

export default Post;
