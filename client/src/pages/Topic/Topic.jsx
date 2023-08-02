import React, { useEffect, useState } from "react";
import LeftSide from "../../components/leftSide/LeftSide";
import RightSide from "../../components/rightSide/RightSide";
import "./Topic.css";
import BurgerComponent from "../../components/burgerComponent/BurgerComponent";
import * as PostApi from "../../api/PostRequest";
import Post from "../../components/postComponent/PostComponent.jsx";
import { useParams } from "react-router-dom";
const Topic = () => {
  const [posts, setPosts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await PostApi.getTopicPosts(id);
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="Topic">
      <BurgerComponent />
      <LeftSide />
      <div className="Posts">
        {posts.map((post) => {
          return <Post post={post} key={post._id} />;
        })}
      </div>
      <RightSide />
    </div>
  );
};

export default Topic;
