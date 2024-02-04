import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { GoogleMap, Marker, useJsApiLoader, InfoWindow } from '@react-google-maps/api';

const mapStyle = {
    height: '900px',
    width: '100%'
};

const Map3 = ({ token, userApts }) => {
    const DEFAULT_ZOOM = 15;
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyB5XqqsxtwR_QCPE8nNwXuAg8EU2EwsoiA", // Replace with your API key
        libraries: ["places"]
    });

    const [map, setMap] = useState(null);
    const [apartments, setApartments] = useState([]);
    const [selectedApt, setSelectedApt] = useState(null);

    const fetchApartments = async () => {
        try {
            const response = await axios.post('http://localhost:8080/user/user', {
                jwt: token.jwt
            });
            setApartments(response.data.apt);
        } catch (error) {
            console.error("Error fetching apartment data:", error);
        }
    };

    const onMapLoad = useCallback((map) => {
        setMap(map);
        fetchApartments();
    }, []);


    useEffect(() => {
        if (isLoaded && apartments.length > 0 && map) {
            const service = new window.google.maps.places.PlacesService(map);
            apartments.forEach(([name, placeId]) => {
                const request = {
                    placeId,
                    fields: ["name", "formatted_address", "place_id", "geometry", "photo", "formatted_phone_number", "rating", "website"],
                };
                service.getDetails(request, (place, status) => {
                    if (status === window.google.maps.places.PlacesServiceStatus.OK && place && place.geometry && place.geometry.location) {
                        place.marker = new window.google.maps.Marker({
                            map,
                            position: place.geometry.location,
                            title: name,
                        });
                        place.marker.addListener("click", () => {
                            setSelectedApt(place);
                        });
                    }
                });
            });
            userApts.forEach(([name, placeId]) => {
                const request = {
                    placeId,
                    fields: ["name", "formatted_address", "place_id", "geometry", "photo", "formatted_phone_number", "rating", "website"],
                };
                service.getDetails(request, (place, status) => {
                    if (status === window.google.maps.places.PlacesServiceStatus.OK && place && place.geometry && place.geometry.location) {
                        place.marker = new window.google.maps.Marker({
                            map,
                            position: place.geometry.location,
                            title: name,
                        });
                        place.marker.addListener("click", () => {
                            setSelectedApt(place);
                        });
                    }
                });
            });
        }
    }, [isLoaded, apartments, map]);

    const renderInfoWindowContent = (place) => (
        <div>
            <h2>{place.name}</h2>
            <p>{place.formatted_address}</p>
            {place.photos && place.photos.length > 0 && (
                <img src={place.photos[0].getUrl({maxWidth: 200, maxHeight: 200})} alt={place.name} style={{paddingTop: '10px'}}/>
            )}
            {place.rating && <p>Rating: {place.rating}/5</p>}
            {place.formatted_phone_number && <p>Phone: {place.formatted_phone_number}</p>}
            {place.website && <p><a href={place.website} target="_blank" rel="noopener noreferrer">Website</a></p>}
        </div>
    );

    if (loadError) {
        return <div>Map cannot be loaded right now, sorry.</div>;
    }

    return (
        <div>
            {isLoaded ? (
                <GoogleMap
                    onLoad={onMapLoad}
                    zoom={DEFAULT_ZOOM}
                    center={{ lat: 37.235730, lng: -80.419470 }}
                    mapContainerStyle={mapStyle}
                >
                    {selectedApt && (
                        <InfoWindow
                            position={{
                                lat: selectedApt.geometry.location.lat(),
                                lng: selectedApt.geometry.location.lng(),
                            }}
                            onCloseClick={() => {
                                setSelectedApt(null);
                            }}
                        >
                            {renderInfoWindowContent(selectedApt)}
                        </InfoWindow>
                    )}
                </GoogleMap>
            ) : <></>}
        </div>
    );
};

export default Map3;