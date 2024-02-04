import React, {useEffect, useState} from "react";
import { Chart } from "react-google-charts";
import Axios from "axios";
import {useParams} from "react-router-dom";

export const data = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7], // CSS-style declaration
];
export const options = {
    title: "My Daily Activities",
    pieHole: 0.4,
    is3D: false,
};

export const LocationInformation = ({token}) => {
    const [info, setInfo] = useState();
    const {orgId} = useParams();
    useEffect(() => {
        // Fetch user information when the component mounts
        getLocationStats();
    }, []); // Empty dependency array ensures the effect runs once

    const options = {
        title: "Locations and Item Quantity",
        pieHole: 0.4,
        is3D: false,
    };
    const getLocationStats = async () => {
        try {
            const response = await Axios.post(
                "http://localhost:8080/item/location/all", {
                    jwt : token.jwt,
                    orgId : orgId
                }
            );
            const some = [["Task", "Hours per Day"], ...response.data.data];
            setInfo(some);
        } catch (error) {
            console.error("Error fetching stats:", error);
        }
    };
    return (
        <Chart
            chartType="PieChart"
            width="100%"
            height="400px"
            data={info}
            options={options}
        />
    );
}
export default LocationInformation;