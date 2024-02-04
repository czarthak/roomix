import React, { useState, useEffect } from "react";
import Axios from "axios";
import {useLocation, useParams, useNavigate} from 'react-router-dom';


export const CreateRequest = ({token}) => {
  // const [reqId, setReqId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [desc, setDesc] = useState("");
  // const [orgId, setOrgId] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [organizationName, setOrganizationName] = useState(""); // name of org to join/add item to
  const orgId = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const rowData = location.state?.data;

  useEffect(() => {
    console.log("in use effect");
    if (rowData) {
      console.log(rowData);
      //setUserEmail(rowData.ownerEmail || ""); // Example field
      setType("JOIN");
      //setDesc(rowData.description || "");
      // ... set other fields similarly
      setOrganizationName(rowData.name || "");
    }
  }, [rowData]);


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(orgId);
    Axios.post("http://localhost:8080/request/add", {
      // reqId: reqId,
      jwt: token.jwt,
      description: desc,
      orgId: orgId
    }).then((response) => {
      console.log(response);
      if (response.data.result === 'success')
      {
        navigate('/myrequests');
      }
    });
  };

  return (
    <div className="creation-form-container">
      <h2>Create Request</h2>
      <form className="create-form" onSubmit={handleSubmit}>
        {/* <label htmlFor="reqId">Request ID</label>
        <input
          value={reqId}
          onChange={(e) => setReqId(e.target.value)}
          name="reqId"
          id="reqId"
          placeholder="Request ID"
        /> */}

        <label htmlFor="name">Organization Name</label>
        <input
          value={organizationName}
          onChange={(e) => setOrganizationName(e.target.value)}
          name="name"
          id="name"
          placeholder="name"
        />


        {/* <label htmlFor="status">Status</label>
        <input
          value={status}
          // onChange={(e) => setStatus(e.target.value)}
          onChange={(e) => PENDING}
          name="status"
          id="status"
          placeholder="STATUS"
        />  */}


        <label htmlFor="desc">Description</label>
        <input
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          id="desc"
          name="desc"
          placeholder="..."
        />

        {/* <label htmlFor="orgId">Organization ID</label>
        <input
          value={orgId}
          onChange={(e) => setOrgId(e.target.value)}
          id="orgId"
          name="orgId"
          placeholder="Organization ID"
        /> */}

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateRequest;

