import React, { useEffect, useState } from "react";
import LeftSide from "../../components/leftSide/LeftSide";
import RightSide from "../../components/rightSide/RightSide";
import "./Topics.css";
import BurgerComponent from "../../components/burgerComponent/BurgerComponent";
import * as PostApi from "../../api/PostRequest";
import { UilSearch } from "@iconscout/react-unicons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Topics = () => {
  const [searchState, setSearchState] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);
  const [topics, setTopics] = useState([]);
  const [searchData, setSearchData] = useState("");

  useEffect(() => {
    const fetchTopics = async () => {
      const { data } = await PostApi.getTrendingTopics(user._id);
      setTopics(data);
    };
    fetchTopics();
  }, []);

  const searchTopics = async () => {
    if (searchData === "") return;
    const { data } = await PostApi.topicSearch(searchData);
    setSearchResults(data);
    setSearchState(true);
  };

  const handleChange = (event) => {
    setSearchData(event.target.value);
  };
  return (
    <div className="Topics">
      <BurgerComponent />
      <LeftSide />
      <div className="topicsCenter">
        <h1>Topics</h1>
        <div className="searchTopics">
          <div className="Search">
            <input
              value={searchData}
              name="searchInput"
              type="text"
              placeholder="Search"
              onChange={handleChange}
            />
            <div className="search-icon" onClick={searchTopics}>
              <UilSearch />
            </div>
          </div>
        </div>
        {searchState ? (
          <div className="searchResults">
            <h2>Search results</h2>
            {searchResults.length > 0 ? (
              searchResults.map((trend) => {
                return (
                  <Link
                    style={{ textDecoration: "none", color: "inherit" }}
                    to={`/topic/${trend._id}`}
                  >
                    <div className="trend-topic" key={trend._id}>
                      <span>{trend.name}</span>
                      <span>
                        {trend.numberOfTopics}{" "}
                        {trend.numberOfTopics > 1 ? "posts" : "post"}
                      </span>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div>No results</div>
            )}
          </div>
        ) : (
          <div className="trendingTopics">
            <h2>Popular</h2>
            {topics.map((trend) => {
              return (
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to={`/topic/${trend._id}`}
                >
                  <div className="trend-topic" key={trend._id}>
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
        )}
      </div>
      <RightSide />
    </div>
  );
};

export default Topics;
