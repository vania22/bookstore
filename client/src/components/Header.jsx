import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import { isAuthenticated } from "../api/auth";
import { CartContext } from "../helpers/CartContext";

const Header = () => {
  const { pathname } = useLocation();
  const [activeLink, setActiveLink] = useState(pathname);
  const { user } = isAuthenticated();
  const { state } = useContext(CartContext);

  const totalItems = state.reduce((acc, curr) => {
    return acc + parseInt(curr.count);
  }, 0);

  const signOut = () => {
    window.localStorage.removeItem("jwt");
    window.localStorage.removeItem("cart");
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
        <li className="nav-item">
          <Link
            className={`nav-link ${activeLink === "/cart" ? "text-warning" : "text-white"}`}
            to="/cart"
          >
            Cart
            <sup>
              <small className="cart-badge">{totalItems}</small>
            </sup>
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
