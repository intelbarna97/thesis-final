import React from "react";
import ProfileComponent from "../profileComponent/ProfileComponent";
import SearchComponent from "../searchComponent/SearchComponent";
import FollowersComponent from "../followersComponent/FollowersComponent";
import "./LeftSide.css";

const LeftSide = () => {
  return (
    <div className="LeftSide">
      <SearchComponent />
      <FollowersComponent />
      <ProfileComponent />
    </div>
  );
};

export default LeftSide;
