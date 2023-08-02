import React from "react";
import "./BurgerComponent.css";
import { UilBars } from "@iconscout/react-unicons";
import { useState } from "react";
import NavComponent from "../navComponent/NavComponent.jsx";
import SearchComponent from "../searchComponent/SearchComponent.jsx";

const BurgerComponent = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };
  return (
    <nav className="navbar">
      <div className="container">
        <div className="menu-icon" onClick={handleShowNavbar}>
          <UilBars />
        </div>
        <SearchComponent />
        <div className={`nav-elements  ${showNavbar && "active"}`}>
          <NavComponent />
        </div>
      </div>
    </nav>
  );
};

export default BurgerComponent;
