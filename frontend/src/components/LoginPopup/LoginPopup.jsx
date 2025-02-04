// src/components/LoginPopup.jsx
import React, { useContext } from "react";
import "./LoginPopup.css";
import { useState } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from 'axios';

const LoginPopup = ({ setShowLogin }) => {
  const { loginUser, registerUser, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const success = await loginUser(data.email, data.password);
      if (success) {
        setShowLogin(false);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onRegister = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const success = await registerUser(data.name, data.email, data.password);
      if (success) {
        setShowLogin(false);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setErrorMessage("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={currState === "Login" ? onLogin : onRegister} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" className="login-popup-container button" disabled={loading}>
          {loading ? (currState === "Sign Up" ? "Creating..." : "Logging in...") : (currState === "Sign Up" ? "Create account" : "Login")}
        </button>
        {errorMessage && <p className="login-popup-error">{errorMessage}</p>}
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>
            By continuing, I agree to the terms and conditions of use & privacy
            policy.
          </p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;