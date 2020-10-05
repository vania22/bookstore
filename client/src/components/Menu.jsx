import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Menu = () => {
  const { pathname } = useLocation();

  const [activeLink, setActiveLink] = useState(pathname);

  const signOut = () => {
    window.localStorage.removeItem("jwt");
  };

  const isAuthenticated = () => {
    if (window.localStorage.getItem("jwt")) {
      return JSON.parse(localStorage.getItem("jwt"));
    } else {
      return false;
    }
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

export default Menu;
