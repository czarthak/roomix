import "./Navbar.css";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export const Navbar = ({ token }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="navbar">
      <Link to="/" className="title">
        Home
      </Link>
      <div
        className="menu"
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <>
          {token == null ? (
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/accountinfo">Profile Information</NavLink>
              </li>
              {/* <li>
                <NavLink to="/myorganizations">My Organizations</NavLink>
              </li> */}
              {/* <li>
                <NavLink to="/createorganization">Create Organization</NavLink>
              </li> */}
              {/* <li>
                <NavLink to="/myrequests">My Requests</NavLink>
              </li> */}
              <li>
                <NavLink to="/listallorganizations">
                  Find Roomates
                </NavLink>
              </li>
              {/* <li>
                <NavLink to="/allorganizationstatistics">
                  Organziation Statistics
                </NavLink>
              </li> */}
              <li>
                <NavLink
                  to="/"
                  onClick={() => {
                    sessionStorage.removeItem("token");
                    window.location.reload(false);
                  }}>
                  Sign Out
                </NavLink>
              </li>
            </>
          )}
        </>
      </ul>
    </nav>
  );
};
