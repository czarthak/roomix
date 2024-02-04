// OrganizationRequests.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import './OrganizationRequests.css'
const OrganizationRequests = ({ token }) => {
    const { orgId } = useParams();
    const [requests, setRequests] = useState([]);
    const [userType, setUserType] = useState('');

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await Axios.post('http://localhost:8080/request/user/requests', {
                    jwt: token.jwt,
                    orgId: parseInt(orgId),
                });

                if (response.data.result === 'success') {
                    setRequests(response.data.data);
                    setUserType(response.data.type);
                } else {
                    console.error('Error fetching requests');
                }
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };

        fetchRequests();
    }, [orgId, token]);

    const handleDecision = async (requestId, status) => {
        try {
            const response = await Axios.post('http://localhost:8080/request/user/request/update', {
                jwt: token.jwt,
                orgId: parseInt(orgId),
                requestId: requestId,
                status: status,
            });

            if (response.data.result === 'success') {
                // Refresh the requests after making a decision
                // fetchRequests();
                window.location.reload(false);
            } else {
                console.error('Error making decision');
            }
        } catch (error) {
            console.error('Error making decision:', error);
        }
    };


    return (
        <div className="organization-requests">
            <h2>Organization Requests</h2>
            <ul className="requests-list">
                {requests.map(([requestId, userEmail, orgId, requestStatus, requestMessage, requestType, itemId, requestQuantity]) => (
                    <li key={requestId} className="request-item">
                        <div className="request-details">
                            <span className="status-column">
                                {requestStatus === 'PENDING' ? (
                                    <span className="pending-status">{requestStatus}</span>
                                ) : requestStatus === 'APPROVED' ? (
                                    <span className="approved-status">{requestStatus}</span>
                                ) : (
                                    <span className="denied-status">{requestStatus}</span>
                                )}
                            </span>
                            <span>{userEmail}</span>
                            {/*<span>{requestStatus}</span>*/}
                            <span>{requestMessage}</span>
                            <span>{requestType}</span>
                            {requestType === 'ITEM' && <span>{requestQuantity}</span>}
                        </div>
                        <div className="request-buttons">
                            {requestStatus === 'PENDING' && (
                                <>
                                    <button
                                        className="accept-button"
                                        onClick={() => handleDecision(requestId, 'ACCEPTED')}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        className="deny-button"
                                        onClick={() => handleDecision(requestId, 'DECLINED')}
                                    >
                                        Decline
                                    </button>
                                </>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrganizationRequests;
