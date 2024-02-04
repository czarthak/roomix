import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserInfo.css'; // Assume we have some basic CSS styles in here

const UserInfo = ({ email }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:8080/apt/user/public', { email: email});
                if (response.data.result === 'success') {
                    setUserData(response.data);
                } else {
                    setError('Failed to fetch data');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [email]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="user-info">
            <h2>User Information</h2>
            {userData && (
                <div>
                    <p><strong>Name:</strong> {userData.user[0]} {userData.user[1]}</p>
                    <p><strong>Phone Number:</strong> {userData.user[2]}</p>
                    <p><strong>Year:</strong> {userData.user[3]}</p>
                    <p><strong>Budget:</strong> ${userData.user[4]}</p>
                    <p><strong>Personality Type:</strong> {userData.user[5]}</p>
                    <p><strong>Major:</strong> {userData.user[6]}</p>
                    <h3>Their Shortlisted Apartments</h3>
                    <ul>
                        {userData.descriptions.map((apt, index) => (
                            <li key={index}>{apt[0]}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UserInfo;
