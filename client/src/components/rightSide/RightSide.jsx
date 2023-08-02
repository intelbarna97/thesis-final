import React from "react";
import "./RightSide.css";
import Navigation from '../navComponent/NavComponent'
import Trending from '../trendingComponent/TrendingComponent'

const RightSide = () => {
  return <div className="RightSide">
    <Navigation/>
    <Trending/>
  </div>;
};

export default RightSide;
