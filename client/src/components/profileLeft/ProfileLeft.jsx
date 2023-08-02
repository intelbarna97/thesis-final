import React from "react";
import "./ProfileLeft.css";
import SearchComponent from "../searchComponent/SearchComponent";
import FollowersComponent from "../followersComponent/FollowersComponent";
import InfoComponent from "../infoComponent/InfoComponent";

const ProfileLeft = () => {
  return (
    <div className="ProfileLeft">
      <SearchComponent />
      <InfoComponent />
      <FollowersComponent />
    </div>
  );
};

export default ProfileLeft;
