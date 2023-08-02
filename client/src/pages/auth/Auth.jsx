import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo1.png";
import { useDispatch, useSelector } from "react-redux";
import { logIn, register } from "../../actions/AuthAction";

export const Auth = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.authReducer.loading);

  const [isLogin, setIsLogin] = useState(false);

  const [data, setData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
    username: "",
    email: "",
  });

  const dataChanged = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const [confirmPass, setConfirmPass] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLogin) {
      data.password === data.confirmPassword
        ? dispatch(register(data))
        : setConfirmPass(false);
    } else {
      dispatch(logIn(data));
    }
  };

  const resetForm = () => {
    setConfirmPass(true);
    setData({
      name: "",
      password: "",
      confirmPassword: "",
      username: "",
      email: "",
    });
  };

  return (
    <div className="Auth Auth-s">
      <div className="auth-left">
        <img src={Logo} alt="logo" srcSet="" />
        <div className="Webname">
          <h1>Gato</h1>
          <h6>Meowdy?</h6>
        </div>
      </div>
      <div className="auth-right">
        <form action="" className="infoForm" onSubmit={handleSubmit}>
          <h3>{isLogin ? "Login" : "Register"}</h3>
          {isLogin ? (
            ""
          ) : (
            <div>
              <input
                type="text"
                placeholder="Name"
                className="infoInput infoInput-s"
                name="name"
                onChange={dataChanged}
                value={data.name}
              />
            </div>
          )}

          <div>
            <input
              type="text"
              placeholder="Username"
              className="infoInput infoInput-s"
              name="username"
              onChange={dataChanged}
              value={data.username}
            />
          </div>
          {isLogin ? (
            ""
          ) : (
            <div>
              <input
                type="email"
                placeholder="Email"
                className="infoInput infoInput-s"
                name="email"
                onChange={dataChanged}
                value={data.email}
              />
            </div>
          )}
          <div>
            <input
              type="password"
              placeholder="Password"
              className="infoInput infoInput-s"
              name="password"
              onChange={dataChanged}
              value={data.password}
            />
            {isLogin ? (
              ""
            ) : (
              <input
                type="password"
                placeholder="Confirm Password"
                className="infoInput infoInput-s"
                name="confirmPassword"
                onChange={dataChanged}
                value={data.confirmPassword}
              />
            )}
          </div>
          {isLogin ? (
            ""
          ) : (
            <span
              style={{
                display: confirmPass ? "none" : "block",
                fontSize: "12px",
                alignSelf: "flex-end",
              }}
            >
              * Passwords are not the same
            </span>
          )}
          <div>
            <span
              style={{ fontSize: "14px", cursor: "pointer" }}
              onClick={() => {
                setIsLogin((prev) => !prev);
                resetForm();
              }}
            >
              {isLogin ? "Create account" : "Already have an account"}
            </span>
          </div>
          <button
            className="button infoButton"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading" : isLogin ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
