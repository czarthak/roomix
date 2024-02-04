import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import "./OrganizationLocation.css"
const OrganizationLocations = ({ token }) => {
    const { orgId } = useParams();
    const [locations, setLocations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [userType, setUserType] = useState('');
    const [newLocation, setNewLocation] = useState('');
    const [createVisible, setCreateVisible] = useState(false);
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await Axios.post('http://localhost:8080/item/user/location', {
                    orgId: parseInt(orgId),
                    jwt: token.jwt,
                });

                if (response.data.result === 'success') {
                    setLocations(response.data.data);
                    setUserType(response.data.type);
                } else {
                    console.error('Error fetching locations');
                }
            } catch (error) {
                console.error('Error fetching locations:', error);
            }
        };

        fetchLocations();
    }, [orgId, token]);

    const handleDeleteLocation = async (locationId, locationName) => {
        if (
            window.confirm(`Are you sure you want to delete the location ${locationName}? This will also delete all the items at this location. Please be sure you want to do that.`)
        ) {
            try {

                const response = await Axios.post('http://localhost:8080/item/user/location/delete', {
                    orgId: parseInt(orgId),
                    jwt: token.jwt,
                    locationId: locationId,
                });

                if (response.data.result === 'success') {
                    // Update the locations list after deletion
                    setLocations(locations.filter(([_, id]) => id !== locationId));
                } else {
                    console.error('Error deleting location');
                }
            } catch (error) {
                console.error('Some unexpected error occurred:', error);
            }
        }
    };
    const handleCreateLocation = async () => {
        try {
            const response = await Axios.post('http://localhost:8080/item/user/location/create', {
                orgId: parseInt(orgId),
                jwt: token.jwt,
                location: newLocation,
            });

            if (response.data.result === 'success') {
                // Refresh the locations after creating a new one
                setCreateVisible(false);
                window.location.reload(false);
            } else {
                console.error('Error creating location');
            }
        } catch (error) {
            console.error('Error creating location:', error);
        }
    };

    const filteredLocations = locations.filter(([locationName]) =>
        locationName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="organization-locations">
            <h2>Organization Locations</h2>
            {userType === 'OWNER' || userType === 'MANAGER' ? (
                <div>
                    <button className="create-location-button" onClick={() => setCreateVisible(true)}>
                        Create Location
                    </button>
                    {createVisible === true && (
                        <div>
                            <input
                                type="text"
                                placeholder="Enter location name"
                                value={newLocation}
                                onChange={(e) => setNewLocation(e.target.value)}
                            />
                            <button onClick={handleCreateLocation}>Enter</button>
                        </div>
                    )}
                </div>
            ) : null}
            <label>
                Search Location:
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </label>
            <ul className="custom-ul">
                {filteredLocations.map(([locationName, locationId]) => (
                    <li key={locationId} className="custom-li">
                        {locationName}
                        {(userType === 'OWNER' || userType === 'MANAGER') && (
                            <button onClick={() => handleDeleteLocation(locationId, locationName)} className="delete-button">
                                Delete Location
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrganizationLocations;
