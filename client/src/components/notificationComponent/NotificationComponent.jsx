import React, { useEffect, useState } from "react";
import "./NotificationComponent.css";
import { UilHeart } from "@iconscout/react-unicons";
import { UilCommentAltLines } from "@iconscout/react-unicons";
import { useSelector } from "react-redux";
import { likePost } from "../../api/LikeRequest";
import { Link, useLocation, useParams } from "react-router-dom";
import * as UserApi from "../../api/UserRequest";

const NotificationComponent = ({ notification }) => {
  const date = new Date(notification.createdAt).toLocaleDateString([], {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    const updateNotification = async () => {
      await UserApi.updateNofitication(notification._id);
    };
    updateNotification();
  }, []);
  return (
    <div className="Notification">
      <span>{notification.message}</span>
      <div className="notification-date">
        <span>{date}</span>
      </div>
    </div>
  );
};

export default NotificationComponent;
