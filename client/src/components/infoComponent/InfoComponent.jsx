import React, { useEffect, useState } from "react";
import "./InfoComponent.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../modals/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from "../../api/UserRequest";

const InfoComponent = () => {
  const [modalOpened, setModalOpen] = useState(false);
  const params = useParams();

  const { user } = useSelector((state) => state.authReducer.authData);

  const username = params.id;
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      if (username === user.username) {
        setUserProfile(user);
      } else {
        const otherUser = await (
          await UserApi.getUserByUsername(username)
        ).data;
        setUserProfile(otherUser);
      }
    };
    fetchUser();
  }, [user]);
  return (
    <div className="InfoComponent">
      <div className="InfoHead">
        <h2>Profile Info</h2>
        {user.username === username ? (
          <div>
            <UilPen onClick={() => setModalOpen(true)} />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpen={setModalOpen}
              data={user}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="Desc">
        <div>
          <b>Description</b>
        </div>
        <div>{userProfile.about}</div>
      </div>
    </div>
  );
};

export default InfoComponent;
