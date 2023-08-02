import React from "react";
import "./Search.css";
import RightSide from "../../components/rightSide/RightSide";
import LeftSide from "../../components/leftSide/LeftSide";
import SearchResultsComponent from "../../components/searchResultsComponent/SearchResultsComponent";
import BurgerComponent from "../../components/burgerComponent/BurgerComponent";

const Profile = () => {
  return (
    <div className="SearchPage">
      <BurgerComponent />
      <LeftSide />
      <div className="SearchCenter">
        <SearchResultsComponent />
      </div>
      <RightSide />
    </div>
  );
};

export default Profile;
