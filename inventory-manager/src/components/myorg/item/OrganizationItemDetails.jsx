// OrganizationItemDetails.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import './OrganizationItemDetails.css';
import '../OrganizationDetails.css'
const OrganizationItemDetails = ({ token }) => {
    const { orgId, itemId } = useParams();
    const [itemInfo, setItemInfo] = useState(null);
    const [locations, setLocations] = useState([]);
    const [modifiedLocation, setModifiedLocation] = useState('');
    const [modifiedFields, setModifiedFields] = useState({
        status: '',
        category: '',
        description: '',
        name: '',
        quantity: 0,
    });
    const navigate = useNavigate();
    const [showRequestForm, setShowRequestForm] = useState(false);
    const [requestDescription, setRequestDescription] = useState('');
    const [requestQuantity, setRequestQuantity] = useState(1);
    const [requestSent, setRequestSent] = useState(false);

    const handleBorrowItem = () => {
        setShowRequestForm(true);
    };
    const [error, setError] = useState(null); // New state for error handling
    const handleDeleteItem = async () => {
        // Logic to handle item deletion
        if (
            window.confirm(
                `Are you sure you want to permanently delete all quantities of ${itemInfo.data[1]}? This will delete the entire item.`
            )
        ) {
            console.log('Deleting item...');
            try {
                const response = await Axios.post('http://localhost:8080/item/user/oneitem/delete', {
                    orgId: parseInt(orgId), // Convert orgId to integer
                    jwt: token.jwt,
                    itemId: parseInt(itemId), // Convert itemId to integer
                });
                if (response.data.result === 'success') {
                    navigate(`/organizations/${orgId}/items`);
                } else {
                    console.error('Error deleting item');
                }
            } catch (error) {
                console.error('Some unexpected error occurred:', error);
            }
        }
    };

    const handleSendRequest = async () => {
        // Logic to send the request
        // You can customize this based on your backend API
        console.log('Sending request...');
        // Assuming you have an API endpoint to handle request creation
        try {
            // You need to replace this with your actual API endpoint
            const response = await Axios.post('http://localhost:8080/request/user/create', {
                orgId: parseInt(orgId),
                itemId: parseInt(itemId),
                description: requestDescription,
                quantity: requestQuantity,
                jwt: token.jwt,
            });

            if (response.data.result === 'success') {
                setRequestSent(true);
                setError(null);
            } else {
                console.error('Error sending request');
                setError('Something went wrong creating the send request!');
            }
        } catch (error) {
            console.error('Some unexpected error occurred:', error);
        }
    };
    const handleDropdownChange = (field, value) => {
        setModifiedFields((prevFields) => ({
            ...prevFields,
            [field]: value,
        }));
    };
    const handleModifyItem = async () => {
        // Logic to handle item modification
        try {
            const modifiedFieldsToSend = {
                orgId: parseInt(orgId),
                jwt: token.jwt,
                itemId: parseInt(itemId),
                ...modifiedFields,
            };

            // Check if a modified field is left blank and use the current value from itemInfo
            Object.keys(modifiedFields).forEach((key) => {
                if (modifiedFields[key] === '') {
                    console.log(key);
                    if (key === 'status')
                        modifiedFieldsToSend[key] = itemInfo.data[6];
                    else if (key === 'quantity')
                        modifiedFieldsToSend[key] = itemInfo.data[4];
                    else if (key === 'category')
                        modifiedFieldsToSend[key] = itemInfo.data[5];
                    else if (key === 'name')
                        modifiedFieldsToSend[key] = itemInfo.data[1];
                    else if (key === 'description')
                        modifiedFieldsToSend[key] = itemInfo.data[2];
                    else if (key === 'location')
                        modifiedFieldsToSend[key] = itemInfo.data[9];
                }
            });

            const response = await Axios.put('http://localhost:8080/item/user/oneitem', modifiedFieldsToSend);

            if (response.data.result === 'success') {
                // Reload the item details after modification
                const fetchItemDetails = async () => {
                    try {
                        const response = await Axios.post('http://localhost:8080/item/user/oneitem', {
                            orgId: parseInt(orgId), // Convert orgId to integer
                            jwt: token.jwt,
                            itemId: parseInt(itemId), // Convert itemId to integer
                        });

                        if (response.data.result === 'success') {
                            setItemInfo(response.data);
                            setError(null);
                        } else {
                            console.error('Error fetching item information');
                            setError('Something went wrong modifying the item');
                        }
                    } catch (error) {
                        console.error('Error fetching item information:', error);
                    }
                };

                fetchItemDetails();
            } else {
                console.error('Error modifying item');
            }
        } catch (error) {
            console.error('Some unexpected error occurred:', error);
        }
    };

    // Fetch item details on component mount
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await Axios.post('http://localhost:8080/item/user/location', {
                    orgId: parseInt(orgId),
                    jwt: token.jwt,
                });

                if (response.data.result === 'success') {
                    setLocations(response.data.data);
                } else {
                    console.error('Error fetching locations');
                }
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        fetchLocations();
        const fetchItemDetails = async () => {
            try {
                const response = await Axios.post('http://localhost:8080/item/user/oneitem', {
                    orgId: parseInt(orgId),
                    jwt: token.jwt,
                    itemId: parseInt(itemId),
                });

                if (response.data.result === 'success') {
                    setItemInfo(response.data);
                } else {
                    console.error('Error fetching item information');
                }
            } catch (error) {
                console.error('Error fetching item information:', error);
            }
        };

        fetchItemDetails();
    }, [orgId, itemId, token]);

    if (!itemInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="organization-item-details">
            <h2>Item Details</h2>
            {error && <p> {error}</p>}
            <div className="item-details">
                <span>Name: {itemInfo.data[1]}</span>
                <span>Description: {itemInfo.data[2]}</span>
                <span>Owner Email: {itemInfo.data[3]}</span>
                <span>Quantity: {itemInfo.data[4]}</span>
                <span>Category: {itemInfo.data[5]}</span>
                <span>Status: {itemInfo.data[6]}</span>
                <span>Location: {itemInfo.data[9]}</span>
            </div>
            {(itemInfo.type === 'OWNER' || itemInfo.type === 'MANAGER') && (
                <div>
                    <h3>Modify Item</h3>
                    <div className="modify-item-fields">
                        <div>
                            <span>Status:</span>
                            <select value={modifiedFields.status} defaultValue={itemInfo.data[6]} onChange={(e) => handleDropdownChange('status', e.target.value)}>
                                <option value="AVAILABLE">Available</option>
                                <option value="BORROWED">Borrowed</option>
                            </select>
                        </div>
                        <div>
                            <span>Category:</span>
                            <select value={modifiedFields.category} defaultValue={itemInfo.data[5]} onChange={(e) => handleDropdownChange('category', e.target.value)}>
                                <option value="STATIONERY">Stationery</option>
                                <option value="MARKETING">Marketing</option>
                                <option value="ELECTRONICS">Electronics</option>
                                <option value="SUPPLIES">Supplies</option>
                                <option value="PERISHABLES">Perishables</option>
                                <option value="MERCHANDISE">Merchandise</option>
                                <option value="TOOLS">Tools</option>
                                <option value="CHEMICALS">Chemicals</option>
                                <option value="FLAMMABLE">Flammable</option>
                                <option value="OTHER">Other</option>
                                <option value="UNIQUE">Unique</option>
                                <option value="BOOKS">Books</option>
                            </select>
                        </div>
                        <label>
                            Description:
                            <input
                                type="text"
                                value={modifiedFields.description}
                                onChange={(e) => setModifiedFields({ ...modifiedFields, description: e.target.value })}
                            />
                        </label>
                        <label>
                            Name:
                            <input
                                type="text"
                                value={modifiedFields.name}
                                onChange={(e) => setModifiedFields({ ...modifiedFields, name: e.target.value })}
                            />
                        </label>
                        <label>
                            Quantity:
                            <input
                                type="number"
                                value={modifiedFields.quantity}
                                onChange={(e) => setModifiedFields({ ...modifiedFields, quantity: e.target.value })}
                            />
                        </label>
                    </div>
                    <label>
                        Location:
                        <select
                            value={modifiedFields.locationId}
                            onChange={(e) => setModifiedFields( { ...modifiedFields, locationId:e.target.value})}
                        >
                            <option value="">Select a location</option>
                            {locations.map(([locationName, locationId], index) => (
                                <option key={locationId} value={locationId}>
                                    {locationName}
                                </option>
                            ))}
                        </select>
                    </label>
                    <button onClick={handleModifyItem} className="modify-item-button">
                        Modify Item
                    </button>
                </div>
            )}
            {(itemInfo.type === 'OWNER' || itemInfo.type === 'MANAGER') && (
                <button onClick={handleDeleteItem} className="delete-item-button">
                    Delete Item
                </button>
            )}
            <div className="request-form">
                {showRequestForm && !requestSent && (
                    <div>
                        <h3>Borrow Item</h3>
                        <label>
                            Description:
                            <input
                                type="text"
                                value={requestDescription}
                                onChange={(e) => setRequestDescription(e.target.value)}
                            />
                        </label>
                        <label>
                            Quantity:
                            <input
                                type="number"
                                value={requestQuantity}
                                onChange={(e) => setRequestQuantity(e.target.value)}
                            />
                        </label>
                        <button onClick={handleSendRequest} className="send-request-button">
                            Send Request
                        </button>
                    </div>
                )}
                {requestSent && <p>Request sent!</p>}
            </div>
            <button onClick={handleBorrowItem} className="borrow-item-button">
                Borrow Item
            </button>
        </div>
    );
};

export default OrganizationItemDetails;
