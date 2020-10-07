import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { isAuthenticated } from "../api/auth";

const Header = () => {
  const { pathname } = useLocation();
  const [activeLink, setActiveLink] = useState(pathname);
  const { user } = isAuthenticated();
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
        <li className="nav-item">
          <Link
            className={`nav-link ${activeLink === "/shop" ? "text-warning" : "text-white"}`}
            to="/shop"
          >
            Shop
          </Link>
        </li>
        {!user ? (
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
          <>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  activeLink.includes("/dashboard") ? "text-warning" : "text-white"
                }`}
                to={user.role === 1 ? "/admin/dashboard" : "/user/dashboard"}
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/" onClick={signOut}>
                Sign Out
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Header;
