import React, {useEffect, useState} from "react";
import { Chart } from "react-google-charts";
import Axios from "axios";
import {useParams} from "react-router-dom";
import './OrganizationItems.css'

export const ItemStats = ({token}) => {
    const [dataold, setDataold] = useState([]);
    const [datanew, setDatanew] = useState([]);
    const {orgId} = useParams();
    const [info, setInfo] = useState();
    const [borrowed, setBorrowed] = useState();
    // let diffdata = {old: [["waiting for load", "wait"], ["wait", 1]],
    // new : [["waiting for load", "wait"], ["wait", 1]]};
    const [diffdata, setDiffdata] = useState({old: [["waiting for load", "wait"], ["wait", 1]],
        new : [["waiting for load", "wait"], ["wait", 1]]});
    useEffect(() => {
        // Fetch user information when the component mounts
        getAvailableStats();
        getBorrowedStats();

    }, []); // Empty dependency array ensures the effect runs once

    const options = {
        title: "My Daily Activities",
        pieHole: 0.4,
        is3D: false,
    };
    const getAvailableStats = async () => {
        try {
            const response = await Axios.post(
                "http://localhost:8080/item/category/available", {
                    jwt : token.jwt,
                    orgId : orgId
                }
            );
            console.log(response.data.data);
            const some = [["Category", "Number of Available items"], ...response.data.data];
            // setDataold(some);
            setInfo(some);
        } catch (error) {
            console.error("Error fetching stats:", error);
        }
    };
    const getBorrowedStats = async () => {
        try {
            const response = await Axios.post(
                "http://localhost:8080/item/category/borrowed", {
                    jwt : token.jwt,
                    orgId : orgId
                }
            );
            console.log(response.data.data);
            const some = [["Category", "Number of Borrowed items"], ...response.data.data];
            setBorrowed(some);
            // setDatanew(some);
            //     old: dataOld,
            //     new: dataNew,
            // };
        } catch (error) {
            console.error("Error fetching stats:", error);
        }
    };
    try {
        return (
            <div className='items-list'>
            <Chart chartType="ColumnChart" width="100%" height="400px" data={info} />,
            <Chart chartType="ColumnChart" width="100%" height="400px" data={borrowed} />
            </div>
        );
    }
    catch (e) {
        return (<div> Something went wrong</div>);
    }
}
export default ItemStats;