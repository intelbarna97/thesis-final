import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getUser } from "../../api/UserRequest";
import "./ConversationComponent.css";

const ConversationComponent = ({ data, currentUserId, online }) => {
  const [userData, setUserData] = useState(null);

  const imageRoute = process.env.REACT_APP_PUBLIC_FOLDER;
  const defaultProfilePicture = "DefaultProfilePicture.png";

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUserId);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.error();
      }
    };
    getUserData();
  });
  return (
    <div className="follower conversation">
      <div>
        <img
          src={
            userData?.profilePicture
              ? imageRoute + userData.profilePicture
              : imageRoute + defaultProfilePicture
          }
          className={online ? "followerImage online" : "followerImage offline"}
          alt=""
        />
        <div className="user-name">
          <span>{userData?.name}</span>
        </div>
      </div>
    </div>
  );
};

export default ConversationComponent;
