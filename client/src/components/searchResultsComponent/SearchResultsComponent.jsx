import React, { useEffect, useState } from "react";
import "./SearchResultsComponent.css";
import SearchResult from "../searchResultComponent/SearchResultComponent.jsx";
import { useParams } from "react-router-dom";
import * as UserApi from "../../api/UserRequest";

const PostsComponent = () => {
  const [users, setUsers] = useState([]);
  const params = useParams();

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await UserApi.searchUser(params.id);
      setUsers(data);
    };
    fetchUsers();
  }, []);

  if (!users) {
    return "No results";
  }
  return (
    <div className="SearchResultsComponent">
      <h2>Search Results</h2>

      {users.map((result) => {
        return <SearchResult result={result} key={result._id} />;
      })}
    </div>
  );
};

export default PostsComponent;
