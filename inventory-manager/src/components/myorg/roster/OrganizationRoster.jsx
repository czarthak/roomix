import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';

import './OrganizationRoster.css'; // Import the CSS file for styling

const OrganizationMembers = ({ token }) => {
    const { orgId } = useParams();
    const [roster, setRoster] = useState([]);
    const [type, setType] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchOrganizationMembers = async () => {
            try {
                const response = await Axios.post('http://localhost:8080/myorg/user/roster', {
                    orgId: orgId,
                    jwt: token.jwt,
                });

                if (response.data.result === 'success') {
                    setRoster(response.data.roster);
                    setType(response.data.type);
                    console.log(response.data.userEmail);
                    setEmail(response.data.userEmail);
                } else {
                    console.error('Error fetching organization members');
                    navigate('/404');
                }
            } catch (error) {
                console.error('Error fetching organization members:', error);
                navigate('/404');
            } finally {
                setLoading(false);
            }
        };

        fetchOrganizationMembers();
    }, [orgId, token, navigate]);

    const canModifyUser = (userType, userEmail) => {
        // Logic to determine if the logged-in user can modify the user with userType
        // You need to implement this based on your specific rules
        // Example: Members can't modify, Managers can modify members, Owners can modify managers and delete members
        if (userEmail === email)
            return false; //can't edit yourself
        // return true;
        return userType === 'MEMBER' && type === 'MANAGER' || type === 'OWNER';
    };

    const handleDropDownChange = async (userEmail, selectedOption) => {
        if (window.confirm(`Are you sure you want to change the user type to ${selectedOption}?`)) {
            // Logic to handle the drop-down change
            // You can implement this based on your requirements
            console.log(`Changing type for ${userEmail} to ${selectedOption}`);
            try {
                const response = await Axios.put('http://localhost:8080/myorg/user/update', {
                    orgId: orgId,
                    jwt: token.jwt,
                    newtype: selectedOption,
                    memberEmail: userEmail
                });
                if (response.data.result === 'success')
                {
                    window.location.reload(false); //refresh the page, remount component and render based on new perms
                }
                else
                {
                    console.log(response);
                }
            } catch (error) {
                console.error('Error fetching organization members:', error);
                navigate('/404');
            }
        } else {
            // Reset the drop-down to the default value if the user cancels the confirmation
            document.getElementById(`${userEmail}-dropdown`).value = 'MODIFY_USER';
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="organization-members">
            <h2>Organization Members</h2>
            <div className="members-list">
                {roster.map((member, index) => (
                    <div key={index} className="member-item">
                        <span>{member[1]}, {member[0]}</span>
                        <span>Email: {member[2]}</span>
                        <span className={`member-type ${member[3].toLowerCase()}`}>{member[3]}</span>
                        {canModifyUser(member[3], member[2]) && (
                            <select
                                id={`${member[2]}-dropdown`}
                                defaultValue="MODIFY_USER"
                                    onChange={(e) => handleDropDownChange(member[2], e.target.value)}>
                                <option value="MODIFY_USER" disable hidden>
                                    Modify User
                                </option>
                                <option value="DELETE">Delete User</option>
                                {member[3] === 'MANAGER' && <option value="MEMBER">Make Member</option>}
                                {type === 'OWNER' && member[3] != 'MANAGER' && <option value="MANAGER">Make Manager</option>}
                                {type === 'OWNER' && member[3] == 'MANAGER' && <option value="OWNER">Transfer Ownership</option>}
                            </select>
                        )}
                    </div>
                ))}
            </div>
            <p>Your role in the organization: {type}</p>
        </div>
    );
};

export default OrganizationMembers;
