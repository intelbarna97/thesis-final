import React from "react";
import "./Profile.css";
import ProfileLeft from "../../components/profileLeft/ProfileLeft";
import RightSide from "../../components/rightSide/RightSide";
import ProfileComponent from "../../components/profileComponent/ProfileComponent";
import PostsComponent from "../../components/postsComponent/PostsComponent";
import { useSelector } from "react-redux";
import BurgerComponent from "../../components/burgerComponent/BurgerComponent";

const Profile = () => {
  const user = useSelector((state) => state.authReducer.authData);
  return (
    <div className="Profile">
      <BurgerComponent />
      <ProfileLeft />
      <div className="ProfileCenter">
        <ProfileComponent />
        <PostsComponent />
      </div>
      <RightSide />
    </div>
  );
};

export default Profile;
