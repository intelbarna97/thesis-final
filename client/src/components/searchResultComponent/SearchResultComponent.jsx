import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { followUser, unFollowUser } from "../../actions/UserAction";
import { createChat } from "../../api/ChatRequest";
import "./SearchResultComponent.css";

const FollowUserComponent = ({ result }) => {
  const [userToFollow, setUserToFollow] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);

  const following = user.following.includes(userToFollow._id);

  const imageRoute = process.env.REACT_APP_PUBLIC_FOLDER;
  const defaultProfilePicture = "DefaultProfilePicture.png";
  const dispatch = useDispatch();

  useEffect(() => {
    setUserToFollow(result);
  }, []);

  const handleFollow = () => {
    following
      ? dispatch(unFollowUser(user._id, userToFollow._id))
      : dispatch(followUser(user._id, userToFollow._id));
  };

  const handleChat = async () => {
    const chat = {
      senderId: user._id,
      receiverId: userToFollow._id,
    };
    await createChat(chat);
  };

  if (userToFollow._id === user._id) {
    return "";
  }
  return (
    <div className="SearchResultComponent">
      <div className="ProfileImage">
        <img
          src={
            userToFollow.profilePicture
              ? imageRoute + userToFollow.profilePicture
              : imageRoute + defaultProfilePicture
          }
          alt=""
        />
      </div>

      <div className="ProfileName">
        <span>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={`/profile/${userToFollow.username}`}
          >
            {userToFollow.name}
          </Link>
        </span>
      </div>

      <div className="FollowStatus">
        <div>
          <div className="follow">
            <span>
              {userToFollow.following ? userToFollow.following.length : "0"}{" "}
              follows
            </span>
          </div>
          <div className="follow">
            <span>
              {userToFollow.followers ? userToFollow.followers.length : "0"}{" "}
              followers
            </span>
          </div>
        </div>
      </div>
      <div className="profile-buttons">
        <button className="button f-button" onClick={handleFollow}>
          {following ? "Unfollow" : "Follow"}
        </button>
        <Link to={"/chat"} onClick={handleChat}>
          <button className="button f-button c-button">Chat</button>
        </Link>
      </div>
    </div>
  );
};

export default FollowUserComponent;
