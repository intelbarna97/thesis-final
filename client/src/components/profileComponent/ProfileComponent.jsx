import React, { useEffect, useState } from "react";
import "./ProfileComponent.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import * as UserApi from "../../api/UserRequest";
import { followUser, unFollowUser } from "../../actions/UserAction";

const ProfileComponent = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.authReducer.authData);
  const [userProfile, setUserProfile] = useState({});
  const imageRoute = process.env.REACT_APP_PUBLIC_FOLDER;
  const defaultProfilePicture = "DefaultProfilePicture.png";
  const following = user.following.includes(userProfile._id);
  const dispatch = useDispatch();
  let location = useLocation();

  useEffect(() => {
    if (pathname === "/profile/" + id) {
      const fetchUser = async () => {
        const { data } = await UserApi.getUserByUsername(id);
        setUserProfile(data);
      };
      fetchUser();
    } else {
      setUserProfile(user);
    }
  }, [location, following]);

  const handleFollow = () => {
    following
      ? dispatch(unFollowUser(user._id, userProfile._id))
      : dispatch(followUser(user._id, userProfile._id));
  };

  return (
    <div className="ProfileComponent">
      <div className="ProfileImage">
        <img
          src={
            userProfile.profilePicture
              ? imageRoute + userProfile.profilePicture
              : imageRoute + defaultProfilePicture
          }
          alt=""
        />
      </div>

      <div className="ProfileName">
        <span>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={`/profile/${userProfile.username}`}
          >
            {userProfile.name}
          </Link>
        </span>
      </div>

      <div className="FollowStatus">
        <div>
          <div className="follow">
            <span>
              {userProfile.following ? userProfile.following.length : "0"}{" "}
              follows
            </span>
          </div>
          <div className="follow">
            <span>
              {userProfile.followers ? userProfile.followers.length : "0"}{" "}
              followers
            </span>
          </div>
        </div>
      </div>
      {userProfile._id !== user._id ? (
        <button
          style={{ width: "50%", "align-self": "center" }}
          className="button f-button"
          onClick={handleFollow}
        >
          {following ? "Unfollow" : "Follow"}
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProfileComponent;
