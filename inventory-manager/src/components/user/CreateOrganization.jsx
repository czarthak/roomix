import React, { useState, useEffect } from "react";
import Axios from "axios";

export const CreateOrganization = ({ token }) => {
  const [userInfo, setUserInfo] = useState({
    fname: "",
    lname: "",
    password: "",
    phoneNumber: "",
    email: "",
  });

  useEffect(() => {
    // Fetch user information when the component mounts
    getUserInfo();
  }, []); // Empty dependency array ensures the effect runs once

  const getUserInfo = async () => {
    try {
      const response = await Axios.post("http://localhost:8080/user/user", {
        jwt: token.jwt,
      });
      setUserInfo(response.data);
    } catch (error) {
      // console.log(response);
      console.error("Error fetching user information:", error);
    }
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:8080/organization/add", {
      name: name,
      email: email,
      description: description,
      ownerEmail: userInfo.email,
      category: category,
      memberCount: 1,
    }).then((response) => {
      // console.log(response);
    });
    window.location.reload(false);
  };

  const categories = [
    "GREEKLIFE",
    "ACADEMIC",
    "RECREATION",
    "TECHNOLOGY",
    "POLITICS",
  ];

  return (
    <div className="creation-form-container">
      <h2>Create Organization</h2>
      <form className="create-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          id="name"
          placeholder="Name"
        />

        <label htmlFor="email">Organization email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="Organization email"
          id="email"
          placeholder="pid@vt.edu"
          type="email"
        />

        <label htmlFor="description">Description</label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          id="description"
          name="description"
          placeholder="..."
        />

        <label htmlFor="category">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          id="category"
          name="category">
          <option value="">Select a category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateOrganization;
