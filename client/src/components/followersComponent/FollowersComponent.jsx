import React, { useState } from "react";
import "./FollowersComponent.css";
import FollowUserComponent from "../followUserComponent/FollowUserComponent.jsx";
import { useSelector } from "react-redux";
import * as UserApi from "../../api/UserRequest";
import { useEffect } from "react";

const FollowersComponent = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await UserApi.getRecommendedUsers(user._id);
      setUsers(data);
    };
    fetchUsers();
  }, []);
  return (
    <div className="FollowersComponent">
      <h3>Who to follow</h3>

      {users.map((follower) => {
        return <FollowUserComponent followable={follower} key={follower} />;
      })}
    </div>
  );
};

export default FollowersComponent;
