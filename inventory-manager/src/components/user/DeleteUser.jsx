import React, { useState } from "react";
import Axios from "axios";
import useToken from "../useToken";

export const DeleteUser = (token) => {
  const [email, setEmail] = useState("");
  // console.log(JSON.parse(token.token).user);
  // console.log(token.token.user);
  console.log(token);
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:8080/user/delete", {
      jwt: token.token.jwt
    }).then((response) => {
      // console.log(response);
      // if (response.data.email == "")
    });
    };


  return (
    <div className="auth-form-container">
      <h2>Delete User</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="User Email"
          id="email"
          name="email"
        />
        <button type="submit">Delete</button>
      </form>
    </div>
  );
};
