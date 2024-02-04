import React, { useState } from "react";
import Axios from "axios";

export const UpdatePassword = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    Axios.put("http://localhost:8080/user/changepass", {
      email: email,
      password: pass,
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="auth-form-container">
      <h2>New Password</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Your Email"
          id="email"
          name="email"
        />
        <label htmlFor="password">New Password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};
