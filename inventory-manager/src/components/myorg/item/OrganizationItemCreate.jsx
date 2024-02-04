import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import '../../user/Login.css'
const OrganizationItemCreate = ({ token }) => {
    const { orgId } = useParams();
    const navigate = useNavigate();

    const [locations, setLocations] = useState([]);
    const [formData, setFormData] = useState({
        status: 'AVAILABLE',
        category: 'TOOLS',
        description: '',
        name: '',
        quantity: 0,
        locationId: '',
    });

    const [error, setError] = useState(null); // New state for error handling
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await Axios.post('http://localhost:8080/item/user/location', {
                    orgId: parseInt(orgId),
                    jwt: token.jwt,
                });

                if (response.data.result === 'success') {
                    setLocations(response.data.data);
                    if (response.data.type === 'MEMBER')
                    {
                        //members are not supposed to create items, redirect them to 404 page
                        navigate('/404');
                    }
                } else {
                    console.error('Error fetching locations');
                }
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        fetchLocations();
    }, [orgId, token]);

    const handleDropdownChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleCreateItem = async () => {
        try {
            const response = await Axios.post('http://localhost:8080/item/user/oneitem/create', {
                orgId: parseInt(orgId),
                jwt: token.jwt,
                ...formData,
            });

            if (response.data.result === 'success') {
                navigate(`/organizations/${orgId}/items`);
            } else {
                console.error('Error creating item');
                setError('Error, incomplete fields'); // Set error message
            }
        } catch (error) {
            console.error('Some unexpected error occurred:', error);
            setError('Error, incomplete fields'); // Set error message
        }
    };

    return (
        <div className="organization-item-create">
            <h2>Create Item</h2>
            <div className="create-item-fields">
                <div>
                    <span>Status:</span>
                    <select value={formData.status} onChange={(e) => handleDropdownChange('status', e.target.value)}>
                        <option value="AVAILABLE">Available</option>
                        <option value="BORROWED">Borrowed</option>
                    </select>
                </div>
                <div>
                    <span>Category:</span>
                    <select value={formData.category} onChange={(e) => handleDropdownChange('category', e.target.value)}>
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
                        {/* Add other category options */}
                    </select>
                </div>
                <label>
                    Description:
                    <input
                        type="text"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </label>
                <label>
                    Name:
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </label>
                <label>
                    Quantity:
                    <input
                        type="number"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    />
                </label>
                <label>
                    Location:
                    <select
                        value={formData.locationId}
                        onChange={(e) => handleDropdownChange('locationId', e.target.value)}
                    >
                        <option value="">Select a location</option>
                        {locations.map(([locationName, locationId]) => (
                            <option key={locationId} value={locationId}>
                                {locationName}
                            </option>
                        ))}
                    </select>
                </label>
                {error && <p className="error-message">{error}</p>}
            </div>
            <button onClick={handleCreateItem} className="create-item-button">
                Create Item
            </button>
        </div>
    );
};

export default OrganizationItemCreate;
