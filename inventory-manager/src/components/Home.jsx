import React from "react";
import "./Home.css";
// Import images
import Image1 from "../images/pic1.jpg";
import Image2 from "../images/pic2.jpg";
import Image3 from "../images/pic3.jpg";
import Image4 from "../images/pic4.jpg";
import Image5 from "../images/pic5.jpg";
import Image6 from "../images/pic6.jpg";

export const Home = () => {

  // Placeholder navigation functions. You'll need to replace these with your actual navigation logic.
  // If you're using React Router, you might use the useHistory hook to programmatically navigate.
  const navigateToLogin = () => {
    // For example: history.push('/login');
  };

  const navigateToSignUp = () => {
    // For example: history.push('/signup');
  };

  return (
    <div className="home-container">
      <h1>Welcome to Roomie Match</h1>
      
      
      
      <div>
        <ul>
        <li><strong>Discover your ideal college roommate with Roomie Match!</strong></li>
          <li><strong>Find personalized roommate matches</strong></li>
          <li><strong>Filter matches by college, major, and more</strong></li>
        </ul>
      </div>
      
      

      <div className="login-signup-bubble">
      <p>Already have an account? <a href="/login">Login</a> If you're new here, <a href="/Register">Sign up</a> and begin your search for the ideal roommate now.</p>
      </div>


      <div className="images-container">
        <img src={Image1} alt="Roommate Match Feature 1" />
        <img src={Image2} alt="Roommate Match Feature 2" />
        <img src={Image3} alt="Roommate Match Feature 3" />
        <img src={Image4} alt="Roommate Match Feature 4" />
        <img src={Image5} alt="Roommate Match Feature 5" />
        <img src={Image6} alt="Roommate Match Feature 6" />
      </div>
    </div>
  );
};