import React, { useState } from "react";
import Axios from "axios";
import PropTypes from "prop-types";
import { Link, Navigate } from "react-router-dom"; // Import Link from React Router
import "./Login.css"; // Import your external CSS file

export const Login = ({ setToken }) => {
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [myToken, setMyToken] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    Axios.post("http://localhost:8080/auth/login", {
      email: email,
      password: pass,
    })
      .then((response) => {
        console.log(response);
        // console.log(response.data.login);
        if (response.data.result === "success") {
          setToken(response);
          setLoggedIn(true);
          setMyToken(response.data);
        } else {
          setError("Invalid email or password. Please try again.");
        }
      })
      .catch((error) => {
        setError("An error occurred. Please try again later.");
        console.error("Login error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  if (loggedIn) {
    return <Navigate to="/accountinfo" token={myToken} />;
  }
  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">PID</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Your Email"
          id="email"
          name="email"
        />
        <label htmlFor="password">Password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        {loading ? <p>Loading...</p> : <button type="submit">Log In</button>}
        {error && <p className="error-message">{error}</p>}
        {/* Add a Link to the Register page */}
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
