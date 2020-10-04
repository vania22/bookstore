import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Menu = () => {
    const { pathname } = useLocation();

    const [activeLink, setActiveLink] = useState(pathname);

    useEffect(() => {
        setActiveLink(pathname);
    }, [pathname]);

    return (
        <div>
            <ul className="nav nav-tabs bg-primary">
                <li className="nav-item">
                    <Link
                        className={`nav-link ${
                            activeLink === '/' ? 'text-warning' : 'text-white'
                        }`}
                        to="/"
                    >
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        className={`nav-link ${
                            activeLink === '/signin'
                                ? 'text-warning'
                                : 'text-white'
                        }`}
                        to="/signin"
                    >
                        Sign In
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        className={`nav-link ${
                            activeLink === '/signup'
                                ? 'text-warning'
                                : 'text-white'
                        }`}
                        to="/signup"
                    >
                        Sign Up
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Menu;
