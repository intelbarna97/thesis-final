import React from "react";
import LeftSide from "../../components/leftSide/LeftSide";
import RightSide from "../../components/rightSide/RightSide";
import "./Settings.css";
import SettingsComponent from "../../components/settingsComponent/SettingsComponent";
import BurgerComponent from "../../components/burgerComponent/BurgerComponent";
const Settings = () => {
  return (
    <div className="Settings">
      <BurgerComponent />
      <LeftSide />
      <SettingsComponent />
      <RightSide />
    </div>
  );
};

export default Settings;
