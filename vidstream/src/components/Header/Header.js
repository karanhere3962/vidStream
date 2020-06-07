import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { user } from "../../atoms";
import "./Header.css";

function Header() {
  const userState = useRecoilValue(user);

  return (
    <div className="header d-flex justify-content-between">
      <div className="headerLogo">
        <Link to="/">I am a logo</Link>
      </div>
      <div className="navLinks">
        <Link to="/">Home</Link>
        {userState.isAuthenticated ? (
          <>
            <Link to="/logout">Logout</Link>
            <Link to="/channels">Channels</Link>
            <Link to="/">Videos</Link>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
}
export default Header;
