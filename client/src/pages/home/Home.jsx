import React from "react";
import CenterLane from "../../components/centerLane/CenterLane";
import LeftSide from "../../components/leftSide/LeftSide";
import RightSide from "../../components/rightSide/RightSide";
import BurgerComponent from "../../components/burgerComponent/BurgerComponent";
import "./Home.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNofitications } from "../../actions/UserAction";

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  useEffect(() => {
    dispatch(getNofitications(user._id));
  }, []);
  return (
    <div className="Home">
      <BurgerComponent />
      <LeftSide />
      <CenterLane />
      <RightSide />
    </div>
  );
};

export default Home;
