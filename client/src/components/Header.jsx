import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { isAuthenticated } from "../api/api";

const Header = () => {
  const { pathname } = useLocation();

  const [activeLink, setActiveLink] = useState(pathname);

  const signOut = () => {
    window.localStorage.removeItem("jwt");
  };

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  return (
    <div>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link className={`nav-link ${activeLink === "/" ? "text-warning" : "text-white"}`} to="/">
            Home
          </Link>
        </li>
        {!isAuthenticated() ? (
          <>
            <li className="nav-item">
              <Link
                className={`nav-link ${activeLink === "/signin" ? "text-warning" : "text-white"}`}
                to="/signin"
              >
                Sign In
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${activeLink === "/signup" ? "text-warning" : "text-white"}`}
                to="/signup"
              >
                Sign Up
              </Link>
            </li>
          </>
        ) : (
          <li className="nav-item">
            <Link className="nav-link text-white" to="/" onClick={signOut}>
              Sign Out
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Header;
