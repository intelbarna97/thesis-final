import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SettingsComponent.css";
import { updateUser } from "../../actions/UserAction";

const SettingsComponent = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();
  const [confirmPass, setConfirmPass] = useState(true);

  const [userData, setData] = useState({
    username: user.username,
    password: "",
    confirmPassword: "",
    email: "",
    currentPassword: "",
    currentHashedPassword: user.password,
  });

  const dataChanged = (e) => {
    setData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.currentPassword !== "") {
      if (userData.password === userData.confirmPassword) {
        console.log(userData);
        dispatch(updateUser(user.username, userData));
      } else {
        setConfirmPass(false);
      }
    }
    resetForm();
  };

  const resetForm = () => {
    setData({
      name: "",
      password: "",
      confirmPassword: "",
      username: user.username,
      email: "",
      currentPassword: "",
    });
  };

  return (
    <div className="SettingsComponent">
      <h1>Settings</h1>
      <form className="SettingsForm" action="" onSubmit={handleSubmit}>
        <div className="email-fields">
          <h2>Email</h2>
          <input
            type="email"
            placeholder={user.email}
            className="input-field"
            name="email"
            onChange={dataChanged}
            value={userData.email}
          />
          <span
            style={{
              display: "block",
              fontSize: "12px",
              alignSelf: "flex-end",
            }}
          >
            *Optional
          </span>
        </div>
        <div className="password-fields">
          <h2>Password</h2>
          <input
            type="password"
            className="input-field"
            placeholder="New password"
            name="password"
            onChange={dataChanged}
            value={userData.password}
          />
          <input
            type="password"
            className="input-field"
            placeholder="Confirm new password"
            name="confirmPassword"
            onChange={dataChanged}
            value={userData.confirmPassword}
          />
          <span
            style={{
              display: "block",
              fontSize: "12px",
              alignSelf: "flex-end",
            }}
          >
            *Optional
          </span>
          <span
            style={{
              display: confirmPass ? "none" : "block",
              fontSize: "12px",
              alignSelf: "flex-end",
            }}
          >
            * Passwords are not the same
          </span>
        </div>
        <div className="current-password-fields">
          <h2>Current password</h2>
          <input
            type="password"
            className="input-field"
            placeholder="Current password"
            name="currentPassword"
            onChange={dataChanged}
            value={userData.currentPassword}
          />
          <span
            style={{
              display: "block",
              fontSize: "12px",
              alignSelf: "flex-end",
            }}
          >
            *Required
          </span>
        </div>
        <button type="submit" className="button settings-submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SettingsComponent;
