import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Chart } from "react-google-charts";

export const OrgChart = () => {
  const [info, setInfo] = useState();
  const [infoForMemberChart, setInfoForMemberChart] = useState();

  useEffect(() => {
    // Fetch user information when the component mounts
    getOrgStats();
    getOrgStatsByMember();
  }, []); // Empty dependency array ensures the effect runs once

  const getOrgStats = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:8080/organization/all/stats/category"
      );
      const some = [["Location", "Number of Items"], ...response.data.data];
      setInfo(some);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const getOrgStatsByMember = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:8080/organization/all/stats/members"
      );
      const some = [["Task", "Hours per Day"], ...response.data.data];
      setInfoForMemberChart(some);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const options1 = {
    title: "Organizations by Category",
  };

  const options2 = {
    title: "Organizations by Popularity",
  };

  return (
    <div>
      <Chart
        chartType="PieChart"
        data={info}
        options={options1}
        width={"100%"}
        height={"400px"}
      />
      <Chart
        chartType="PieChart"
        data={infoForMemberChart}
        options={options2}
        width={"100%"}
        height={"400px"}
      />
    </div>
  );
};
export default OrgChart;
