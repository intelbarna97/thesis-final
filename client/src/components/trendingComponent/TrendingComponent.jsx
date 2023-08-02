import React, { useEffect, useState } from "react";
import "./TrendingComponent.css";
import * as PostApi from "../../api/PostRequest";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const TrendingComponent = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      const { data } = await PostApi.getTrendingTopics(user._id);
      setTopics(data);
    };
    fetchTopics();
  }, []);
  return (
    <div className="trending">
      <h2>#Trending</h2>
      {topics.map((trend) => {
        return (
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={`/topic/${trend._id}`}
          >
            <div className="trend" key={trend._id}>
              <span>{trend.name}</span>
              <span>
                {trend.numberOfTopics}{" "}
                {trend.numberOfTopics > 1 ? "posts" : "post"}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default TrendingComponent;
