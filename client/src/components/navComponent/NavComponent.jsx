import React from "react";
import { Link } from "react-router-dom";
import "./NavComponent.css";
import {
  UilUser,
  UilEnvelopeAlt,
  UilSignOutAlt,
  UilBell,
  UilSetting,
  UilSwatchbook,
  UilHome,
} from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/AuthAction";

const NavComponent = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const { notifications } = useSelector((state) => state.notificationReducer);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="navigation">
      <Link style={{ textDecoration: "none", color: "inherit" }} to={"/home"}>
        <button className="button nav-button">
          <UilHome /> <span> Home</span>
        </button>
      </Link>
      <Link
        style={{ textDecoration: "none", color: "inherit" }}
        to={"/notifications"}
      >
        <button className="button nav-button">
          <UilBell />
          <span
            style={
              notifications === "" || notifications.length === 0
                ? {}
                : { textDecoration: "underline" }
            }
          >
            Notifications
          </span>
        </button>
      </Link>
      <Link style={{ textDecoration: "none", color: "inherit" }} to={"/chat"}>
        <button className="button nav-button">
          <UilEnvelopeAlt /> <span>Messages</span>
        </button>
      </Link>
      <Link style={{ textDecoration: "none", color: "inherit" }} to={"/topics"}>
        <button className="button nav-button">
          <UilSwatchbook /> <span>Topics</span>
        </button>
      </Link>
      <Link
        style={{ textDecoration: "none", color: "inherit" }}
        to={`/profile/${user.username}`}
      >
        <button className="button nav-button">
          <UilUser /> <span>Profile</span>
        </button>
      </Link>
      <Link
        style={{ textDecoration: "none", color: "inherit" }}
        to={"/settings"}
      >
        <button className="button nav-button">
          <UilSetting /> <span>Settings</span>
        </button>
      </Link>
      <button className="button nav-button" onClick={handleLogout}>
        <UilSignOutAlt /> <span>Signout</span>
      </button>
    </div>
  );
};

export default NavComponent;
