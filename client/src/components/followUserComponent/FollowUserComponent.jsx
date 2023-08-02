import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { followUser, unFollowUser } from "../../actions/UserAction";
import * as UserApi from "../../api/UserRequest";

const FollowUserComponent = ({ followable }) => {
  const [userToFollow, setUserToFollow] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);

  const imageRoute = process.env.REACT_APP_PUBLIC_FOLDER;
  const defaultProfilePicture = "DefaultProfilePicture.png";
  const dispatch = useDispatch();
  const following = user.following.includes(userToFollow._id);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await UserApi.getUser(followable);
      setUserToFollow(data);
    };
    fetchUser();
  }, []);

  const handleFollow = () => {
    following
      ? dispatch(unFollowUser(user._id, userToFollow._id))
      : dispatch(followUser(user._id, userToFollow._id));
  };
  return (
    <div className="follower">
      <div>
        <img
          src={
            userToFollow.profilePicture
              ? imageRoute + userToFollow.profilePicture
              : imageRoute + defaultProfilePicture
          }
          alt=""
          className="followerImg"
        />
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to={`/profile/${userToFollow.username}`}
        >
          <div className="name">
            <span>{userToFollow.name}</span>
            <span>@{userToFollow.username}</span>
          </div>
        </Link>
      </div>
      <button className="button f-button" onClick={handleFollow}>
        {following ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default FollowUserComponent;
