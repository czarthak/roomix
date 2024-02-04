import React, { useState, useEffect } from 'react';
import {useParams, Navigate, useNavigate } from 'react-router-dom';
import Axios from 'axios';
// import './OrganizationDetails.css'
const OrganizationDetails = ({token}) => {
    const { orgId } = useParams();
    const [organization, setOrganization] = useState(null);
    const [type, setType] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const fetchOrganizationDetails = async () => {
            try {
                console.log(token);
                const response = await Axios.post(`http://localhost:8080/myorg/user/org`, {
                    jwt: token.jwt,
                    orgId: orgId
                });

                if (response.data.result === 'success') {
                    setOrganization(response.data.data);
                    setType(response.data.type);
                } else {
                    console.error('Error fetching organization details');
                    navigate('/404');
                }
            } catch (error) {
                console.error('Error fetching organization details:', error);
                navigate('/404');
            }
        };

        fetchOrganizationDetails();
    }, [orgId]);

    const handleRosterButtonClick = () => {
        // Redirect to the OrganizationMembers page
        
        navigate(`/organizations/${orgId}/members`);
    };
    const handleItemsButtonClick = () => {
        // Redirect to the OrganizationMembers page
        navigate(`/organizations/${orgId}/items`);
    };
    const handleLeaveButtonClick = async () => {
        if (window.confirm(`Are you sure you want to leave the organization: ${organization.name}?`)) {
            try {
                const response = await Axios.put('http://localhost:8080/myorg/user/update', {
                    orgId: orgId,
                    jwt: token.jwt,
                    newtype: "DELETE",
                    memberEmail: "self"
                });
                if (response.data.result === 'success') {
                    // window.location.reload(false); //refresh the page, remount component and render based on new perms
                    navigate(`/myorganizations`, {state: {token2: token}});
                } else {
                    console.log(response);
                }
            } catch (error) {
                console.error('Error fetching organization members:', error);
                navigate('/404');
            }
        } else {
            console.log("user clicked no, doing nothing");
        }

    }
    const handleLocationButtonClick = () => {
        navigate(`/organizations/${orgId}/locations`);
    };

    const handleRequestButtonClick = () => {
        navigate(`/organizations/${orgId}/requests`);
    };
    const handleLocationInfoButtonClick = () => {
        navigate(`/organizations/${orgId}/locationinformation`);
    };
    const handleItemInfoButtonClick = () => {
        navigate(`/organizations/${orgId}/itemstats`);
    };
    if (!organization) {
        return <div>Loading...</div>;
    }

    return (
        <div className="organization-details">
            <div className="organization-info">
            <h2>{organization.name}</h2>
            <p>Email: {organization.email}</p>
            <p>Owner Email: {organization.ownerEmail}</p>
            <p>Description: {organization.description}</p>
            <p>Member Count: {organization.memberCount}</p>
            </div>
            {/* Buttons at the bottom */}
            <div className="button-container">
                <button className="blue-button" onClick={handleRosterButtonClick}>Roster</button>
                {(type === 'MANAGER' || type === 'OWNER') && <button className="blue-button" onClick={handleRequestButtonClick}>Requests</button>}
                {(type === 'MANAGER' || type === 'OWNER') && <button className="blue-button" onClick={handleLocationInfoButtonClick}>Location Information</button>}
                {(type === 'MANAGER' || type === 'OWNER') && <button className="blue-button" onClick={handleItemInfoButtonClick}>Item Information</button>}
                <button className="blue-button" onClick={handleItemsButtonClick}>Items</button>
                <button className="blue-button" onClick={handleLocationButtonClick}>Locations</button>
                <button className="dark-red-button" onClick={handleLeaveButtonClick}>Leave Organization</button>
            </div>
        </div>
    );
};

export default OrganizationDetails;
