import React from "react";
import "./landingPage.css";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineLogout,
  HiOutlineBookmarkAlt,
} from "react-icons/hi";

export default function LandingPage({loggedIn}) {
  // Landing page
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="landing-page-nav">
        <h2>BOOKSHOP MANAGEMENT SYSTEM</h2>
        <div className="landing-button">
          <div>
            <button onClick={() => navigate("/signin")} className='home_link'>Log In</button>
              <HiOutlineLogout className="landing_page_icon"/>
          </div>
          <div>
            <button className="home_link" onClick={()=>navigate(loggedIn?"/dash":"/")}>Dashboard</button>
              <HiOutlineBookmarkAlt className="landing_page_icon"/>
          </div>
        </div>
      </div>
      <div className="landing-page-message">
        <h1>Let us help you manage your bookshop</h1>
        <img src="/svgs/landing-books.svg" alt="Books logo"></img>
      </div>
      <div className="landing-page-message">
        <h5>
          Make sales, track orders, and track cash on any device at anytime. 
        </h5>
      </div>
      <div className="landing-button-join">
        <button id="landing-join-us-button" onClick={() => navigate("/signup")}>
          Join Us
        </button>
      </div>
    </div>
  );
}
