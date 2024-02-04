import React, { useState, useEffect } from "react";
import Axios from "axios";
import PropTypes from "prop-types";
import "./AccountInformation.css"; // Import your external CSS file
import Places from "../map/places";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { Link } from "react-router-dom";
import { TextField, Avatar } from '@mui/material';
import { IconButton, CloudUploadIcon } from '@mui/material';


const AccountInformation = ({ token }) => {
  const [userInfo, setUserInfo] = useState({
    fname: "",
    lname: "",
    password: "",
    phoneNumber: "",
    email: "",
    year: "",
    major: "",
    bio: "",
    preferApart: "",
    budget: "",
    personalTrait: "",
  });




  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedApts, setSelectedApts] = useState([]);
  const [initials, setInitials] = useState("");

  const [profilePic, setProfilePic] = useState(localStorage.getItem('profilePic') || '');

  useEffect(() => {
    // When userInfo is fetched or updated, update the initials
    if (userInfo.fname && userInfo.lname) {
      const initials = `${userInfo.fname[0]}${userInfo.lname[0]}`.toUpperCase();
      setInitials(initials);
    }
  }, [userInfo]);


  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    // Replace with how you get the user's email

    if (file) {
      const formData = new FormData();
      formData.append('imageFile', file);

      // Include the email in the URL as a query parameter
      const url = `http://localhost:8080/user/img?email=${encodeURIComponent(userInfo.email)}`;

      Axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(response => {
          console.log('Image uploaded successfully:', response.data);
        })
        .catch(error => {
          console.error('Error uploading image:', error);
        });
    }
  };



  const removeApartment = async (id) => {
    try {
      const response = await Axios.post('http://localhost:8080/apt/user/delete', {
        jwt: token.jwt,
        id: id,
      });

      if (response.data.result === 'success') {
        // Update the state to remove the apartment
        setSelectedApts(selectedApts.filter(apt => apt[1] !== id));
      }
    } catch (error) {
      console.error('Error removing apartment:', error);
    }
  };


  const [updateSuccess, setUpdateSuccess] = useState(false);

  const getImageUrl = (email) => {
    const imageName = email.replace(/[@.]/g, '') + '.jpeg';
    console.log(imageName);
    // Update the path according to where your images are served from
    const imageUrl = `${process.env.PUBLIC_URL}/${imageName}`;
    return imageUrl;
  };

  useEffect(() => {
    // Fetch user information when the component mounts
    getUserInfo();
  }, []); // Empty dependency array ensures the effect runs once

  const getUserInfo = async () => {
    try {
      const response = await Axios.post("http://localhost:8080/user/user", {
        jwt: token.jwt,
      });
      console.log(response);
      if (response.data.result != "success") {
        console.error("Error fetching user information:");
      }
      setUserInfo(response.data.user);
      setSelectedApts(response.data.apt);
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await Axios.put("http://localhost:8080/user/update", {
        ...userInfo,
        jwt: token.jwt,
      });
      setUserInfo(response.data);
      setUpdateSuccess(true);
      console.log("User information updated successfully");
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };

  const handleLocationSelect = async (location) => {
    console.log(location);
    try {
      const response = await Axios.post("http://localhost:8080/apt/user/add", {
        jwt: token.jwt,
        description: location.description,
        id: location.reference
      });
      console.log(response);
      setSelectedApts(prevApts => [...prevApts, [location.description, location.reference]]);
    }
    catch (error) {
      console.error("Error updating user information:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  return (
    <div className="account-info-container">
      <Avatar
        src={getImageUrl(userInfo.email)}
        sx={{ width: 80, height: 80, m: 2 }}
        alt={`${userInfo.fname} ${userInfo.lname}`}
      />
      <h2>Profile Information</h2>
      {updateSuccess && (
        <p className="success-message">Information updated successfully!</p>
      )}
      <div className="info-form">
        <label htmlFor="fname">First Name</label>
        <input
          type="text"
          id="fname"
          name="fname"
          value={userInfo.fname}
          onChange={handleChange}
        />

        <label htmlFor="lname">Last Name</label>
        <input
          type="text"
          id="lname"
          name="lname"
          value={userInfo.lname}
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={userInfo.password}
          onChange={handleChange}
        />

        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={userInfo.phoneNumber || ""}
          onChange={handleChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={userInfo.email}
          onChange={handleChange}
        />

        {/* Additional fields for user information */}
        <label htmlFor="year">Year </label>
        <select
          id="year"
          name="year"
          value={userInfo.year}
          onChange={handleChange}
        >
          <option value="Freshman">Freshman</option>
          <option value="Sophomore">Sophomore</option>
          <option value="Junior">Junior</option>
          <option value="Senior">Senior</option>
          <option value="Grad">Grad</option>
        </select>


        <label htmlFor="major">Major</label>
        <input
          type="text"
          id="major"
          name="major"
          value={userInfo.major}
          onChange={handleChange}
        />

        <label htmlFor="bio">Biography (A little about yourself)</label>
        <textarea
          id="bio"
          name="bio"
          value={userInfo.bio}
          onChange={handleChange}
        />
        <label> Add some places you'd want to live at here </label>
        <Places handleLocationSelect={handleLocationSelect} />


        <label htmlFor="budget">Budget (Per Month)</label>
        <input
          type="text"
          id="budget"
          name="budget"
          value={userInfo.budget}
          onChange={handleChange}
        />

        <p></p>

        <div className="selected-apartments">
          <b> Apartments shortlisted </b>
          {selectedApts.map((apt, index) => (
            <div key={index} className="apartment-item">
              {apt[0]} {/* Apartment description */}
              <button className="remove-apartment-btn" onClick={() => removeApartment(apt[1])}>X</button>
            </div>
          ))}
        </div>

        <div className="home-container">

          <h2>Discover Your Roomie Match</h2>
          <p>
            Unlock a more personalized roommate matching experience by sharing your personality type.
          </p>
          <p>
            Knowing your personality type helps us find the roommate who complements you best. Enter your 16-personality type (e.g., INFP, ESTJ, etc.) below:
          </p>

          <label htmlFor="personalTrait">Personality Test Result:</label>
          <input
            type="text"
            id="personalTrait"
            name="personalTrait"
            value={userInfo.personalTrait}
            onChange={handleChange}
          />

          <p>
            Not sure of your personality type? No problem! Take our custom Test
            <Link to="/personality-test" className="personality-test-button">
              <b>Start Now</b>
            </Link>

          </p>




        </div>


        <button type="button" onClick={handleUpdate}>
          Update Information
        </button>
      </div>

    </div>
  );
};

AccountInformation.propTypes = {
  token: PropTypes.shape({
    jwt: PropTypes.string.isRequired,
  }).isRequired,
};

export default AccountInformation;

