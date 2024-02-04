import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import PropTypes from "prop-types";
import './MyRequests.css'
import {Link, useLocation} from "react-router-dom";
const MyRequests = ({ token }) => {
    const [requests, setRequests] = useState([]);
    // if (token == null || token == undefined)
    //     const {token2} = useLocation();
    //     token = token2;
    const {state} = useLocation();
    if (token == null || token == undefined)
    {
        console.log('updated token to be token2');
        token = state.token2;
    }
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                console.log(token)
                const response = await Axios.post('http://localhost:8080/request/user', {
                    jwt: token.jwt
                });

                if (response.data.result === 'success') {
                    setRequests(response.data.data);
                } else {
                    console.error('Error fetching requests');
                }
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };

        fetchRequests();
    }, [token]);

    return (
        <div className="request-list">
            <h2>Your Requests</h2>
            <ul>
                {requests.map((request) => (
                    <li key={request[4]} className="request-item">
                        {/* <Link to={`/organizations/${org.orgId}`}>
                        <h3>{org.name}</h3>
                        </Link> */}
                        <p>Organization Name: {request[2]}</p>
                        <p>Status: {request[0]}</p>
                        <p>Description: {request[1]}</p>
                        <p>Type: {request[3]}</p>
                        {request[6] && <p> Item Name: {request[6]}</p>}
                        {request[5] && <p> Item Quantity: {request[5]}</p>}
                        {/* Add more information as needed */}
                    </li>
                ))}
            </ul>
        </div>
    );
};
MyRequests.propTypes = {
    token: PropTypes.shape({
        jwt: PropTypes.string.isRequired,
    }).isRequired,
};
export default MyRequests;
