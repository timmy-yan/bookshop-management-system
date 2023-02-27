import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  HiOutlineMail,
  HiOutlineEye,
  HiOutlineLockClosed,
  HiOutlineHome
} from "react-icons/hi";
import "./sigin.css";

export default function SignIn({setLoggedIn}) {
  // The signIn page
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  const [action, setAction] = useState(false);

  function handleInput(e) {
    const key = e.target.name;
    const value = e.target.value;
    setErrors()

    setErrors("");
    setFormData({ ...formData, [key]: value });
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        role: action ? "" : "manager",
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => {
            localStorage.setItem("user", JSON.stringify(user.user));
            localStorage.setItem("token", user.jwt);
            localStorage.setItem("role", action?"":"manager");
            setLoggedIn(true)
            navigate(`${action ? "/make_sale" : "/dash"}`);
          });
        } else {
          console.log(r.status)
          setErrors("Wrong Email or Password")
        }
      })
      .catch((err) => {
        setErrors(err)});
  }

  return (
    <div className="sign-in">
      <div className="registration">
        <div className="registration-nav">
          <h2>BOOKSHOP MANAGEMENT SYSTEM</h2>
          <button>
          <Link to="/" className="home_link">Home</Link>
          <HiOutlineHome className="home_icon"/>          </button>
        </div>
        <div className="registration-container">
          <div className="registration-signup-form">
            <h3>Welcome back</h3>
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="login-inputs-container">
                <div className="login_mail">
                  <HiOutlineMail  className="login_left_icon"/>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email address"
                    required
                    onChange={(e) => {
                      handleInput(e);
                    }}
                  />
                </div>
                <div className="login_pass">
                  <HiOutlineLockClosed className="login_left_icon"/>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    onChange={(e) => {
                      handleInput(e);
                    }}
                  />
                  <HiOutlineEye id="login_view_pass" />
                </div>
              </div>
              <br />
              <div className="login-button-form">
                <button type="submit">Login</button>
                <button> <Link to="/signup">Register</Link></button>
              </div>
              <div className="login_forgot_password">
                <span>Forgot password?</span>
              </div>
            </form>
            <p style={{ color: "red", fontStyle: "italic" }}>
              {errors && `${errors}!`}
            </p>
            <div className="login-checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={action}
                  onChange={() => setAction(!action)}
                />
                Access Point of Sale
              </label>
            </div>
          </div>
          <div className="registration-welcome-message">
            <img src="/svgs/login-svg.svg" alt="#" />
            <h5>Hey, welcome back!</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
