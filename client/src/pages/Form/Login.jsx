import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { loginUser } from "../../redux/actions";
import { Button, Checkbox, Form } from "semantic-ui-react";
import "../../assets/form.css";
import logoR from "../../assets/logoR.png";
import io from "socket.io-client";
const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.userReducer);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      userName,
      password,
    };
    dispatch(loginUser(newUser));
  };

  return (
    <div className="login">
      {localStorage.getItem("token") ? (
        <Navigate to="/home"></Navigate>
      ) : (
        <div className="form-container-login">
          <div className="img-container-login">
            <img src={logoR} className="logo-login" height="50px" alt="" />
          </div>
          <div className="welcome-msg">
            <h1>Connect with your favorite people.</h1>
          </div>
          <Form className="login-form" onSubmit={handleSubmit}>
            <div className="login-userName">
              <Form.Field>
                <label>UserName</label>
                <input
                  placeholder="userName"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Form.Field>
            </div>
            <div className="login-password">
              <Form.Field>
                <label>Password</label>
                <input
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Field>
            </div>
            <div className="login-checkbox">
              <Checkbox
                label="Remember me"
                onClick={() => {
                  console.log("clicked");
                }}
              />
            </div>
            {!loading ? (
              <Button
                className="btn1-login"
                color="violet"
                onSubmit={handleSubmit}
                type="submit"
              >
                Submit
              </Button>
            ) : (
              <Button className="btn2-login" loading color="violet">
                Loading
              </Button>
            )}
            <div className="login-links">
              <div className="register-link">
                Don't have an account?
                <Link to="/">create an account</Link>
              </div>
              <div className="forgot-link">
                Forgot your password? <Link to="/">reset it</Link>
              </div>
            </div>
          </Form>
          <div style={{ display: "none" }}></div>
        </div>
      )}
    </div>
  );
};

export default Login;
