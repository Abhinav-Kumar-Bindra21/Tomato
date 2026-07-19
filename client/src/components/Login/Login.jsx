import React, { useState } from "react";
import "./Login.css";
import { assets } from "../../assets/frontend_assets/assets";

const Login = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Sign Up");
  return (
    <div className="login-popup">
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img src={assets.cross_icon} onClick={() => setShowLogin(false)} alt="" />
        </div>

        <div className="login-popup-input">
          {currState === "Login" ? <></> : <input type="text" placeholder="Enter your name" required />}
          <input type="email" placeholder="Enter your email" required />
          <input type="password" placeholder="Enter your password" required />
        </div>

        <button>{currState === "Sign Up" ? "Create an account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing,I agree to the terms of use & privacy policy</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?<span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
