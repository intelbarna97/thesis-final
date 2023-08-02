import React, { useState } from "react";
import Logo from "../../img/logo1.png";
import { UilSearch } from "@iconscout/react-unicons";
import "./SearchComponent.css";
import { Link } from "react-router-dom";

const SearchComponent = () => {
  const [searchData, setSearchData] = useState([]);

  const handleChange = (event) => {
    setSearchData(event.target.value);
  };
  return (
    <div className="SearchComponent">
      <img src={Logo} alt="" />
      <div className="Search">
        <input
          value={searchData}
          name="searchInput"
          type="text"
          placeholder="Search"
          onChange={handleChange}
        />
        <Link to={searchData ? `/search/${searchData}` : "/home"}>
          <div className="search-icon">
            <UilSearch />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SearchComponent;
