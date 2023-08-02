import React from "react";
import { useSelector } from "react-redux";
import "./Notifications.css";
import BurgerComponent from "../../components/burgerComponent/BurgerComponent";
import LeftSide from "../../components/leftSide/LeftSide";
import RightSide from "../../components/rightSide/RightSide";
import NotificationComponent from "../../components/notificationComponent/NotificationComponent";

const Notifications = () => {
  const { notifications } = useSelector((state) => state.notificationReducer);

  return (
    <div className="Notifications">
      <BurgerComponent />
      <LeftSide />
      <div className="NotificationsComponent">
        <h1>Notifications</h1>
        {notifications.map((notification) => {
          return (
            <NotificationComponent
              notification={notification}
              key={notification._id}
            />
          );
        })}
      </div>
      <RightSide />
    </div>
  );
};

export default Notifications;
