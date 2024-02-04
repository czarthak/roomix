import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./PersonalityTest.css";

const PersonalityTest = () => {
  const [answers, setAnswers] = useState({
    energy: '', // E or I
    information: '', // S or N
    decisions: '', // T or F
    lifestyle: '' // J or P
  });
  const [result, setResult] = useState(""); // State to store the result

  // Function to handle option change
  const handleOptionChange = (category, value) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [category]: value
    }));
  };

  // Function to compile and display the final result
  const calculateResult = () => {
    return `${answers.energy}${answers.information}${answers.decisions}${answers.lifestyle}`;
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const personalityType = calculateResult();
    setResult(`Your personality type is: ${personalityType}`); // Update the result state
    
  };

  return (
    <div className="personality-test-container">
      <h1>Let's Find Your Roomie Personality!</h1>
      <p>To enhance your search for the perfect roommate, we've crafted a quick personality quiz. Your answers will help us connect you with a roommate who truly matches your lifestyle and preferences.</p>
      <p>Simply answer "Yes" or "No" to each question.</p>

      <form onSubmit={handleSubmit}>
        {/* Question 1 */}
        // Inside your component's return statement
        {/* Question 1 */}
        <div className="question">
        <p>Do you find yourself rejuvenated by social gatherings and conversations with others?</p>
        <label className={answers.energy === 'E' ? 'label-selected' : ''}>
            <input type="radio" name="energy" value="E" onChange={() => handleOptionChange('energy', 'E')} /> Yes
        </label>
        <label className={answers.energy === 'I' ? 'label-selected' : ''}>
            <input type="radio" name="energy" value="I" onChange={() => handleOptionChange('energy', 'I')} /> No
        </label>
        </div>


        {/* Question 2 */}
        <div className="question">
        <p>When making decisions, do you prefer to focus on practical, real-world details rather than abstract concepts and possibilities?</p>
        <label className={answers.information === 'S' ? 'label-selected' : ''}>
            <input type="radio" name="information" value="S" onChange={() => handleOptionChange('information', 'S')} /> Yes
        </label>
        <label className={answers.information === 'N' ? 'label-selected' : ''}>
            <input type="radio" name="information" value="N" onChange={() => handleOptionChange('information', 'N')} /> No
        </label>
        </div>

        {/* Question 3 */}
        <div className="question">
        <p>When making decisions, do you rely more on logic and objective analysis than on your personal values and emotional considerations?</p>
        <label className={answers.decisions === 'T' ? 'label-selected' : ''}>
            <input type="radio" name="decisions" value="T" onChange={() => handleOptionChange('decisions', 'T')} /> Yes
        </label>
        <label className={answers.decisions === 'F' ? 'label-selected' : ''}>
            <input type="radio" name="decisions" value="F" onChange={() => handleOptionChange('decisions', 'F')} /> No
        </label>
        </div>

        {/* Question 4 */}
        <div className="question">
        <p>Do you enjoy planning ahead and sticking to a structured schedule over not having a plan at all?</p>
        <label className={answers.lifestyle === 'J' ? 'label-selected' : ''}>
            <input type="radio" name="lifestyle" value="J" onChange={() => handleOptionChange('lifestyle', 'J')} /> Yes
        </label>
        <label className={answers.lifestyle === 'P' ? 'label-selected' : ''}>
            <input type="radio" name="lifestyle" value="P" onChange={() => handleOptionChange('lifestyle', 'P')} /> No
        </label>
        </div>


        <button type="submit">Submit</button>
      </form>

      {/* Display the result if available */}
      {result && <div className="result">{result}</div>}

      <p>
        <Link to="/accountinfo" className="back-link">Back to Account Info</Link>
      </p>
    </div>
  );
};


export default PersonalityTest;
