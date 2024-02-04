import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";

import PersonalityTest from "./components/user/PersonalityTest";
import {
  DeleteUser,
  Login,
  Register,
  UpdatePassword,
  CreateOrganization,
  CreateRequest,
  ListAllOrganizations,
  OrganizationSearch,
} from "./components/user/index";
import { useState } from "react";
import useToken from "./components/useToken";
import AccountInformation from "./components/user/AccountInformation";
import PrivateRoutes from "./routes/PrivateRoutes";
import MyOrganizations from "./components/myorg/MyOrganizations";
import OrganizationDetails from "./components/myorg/OrganizationDetails";
import NotFound from "./components/error/NotFound";
import OrganizationRoster from "./components/myorg/roster/OrganizationRoster";
import OrganizationItems from "./components/myorg/item/OrganizationItems";
import OrganizationItemDetails from "./components/myorg/item/OrganizationItemDetails";
import OrganizationItemCreate from "./components/myorg/item/OrganizationItemCreate";
import OrganizationLocations from "./components/myorg/location/OrganizationLocations";
import OrganizationRequests from "./components/myorg/request/OrganizationRequests";
import MyRequests from "./components/myrequests/MyRequests";
import OrgChart from "./components/stats/OrgChart";
import LocationInformation from "./components/myorg/location/LocationInformation";
import ItemStats from "./components/myorg/item/ItemStats";
function App() {
  // const [token, setToken] = useState();
  const { token, setToken } = useToken();
  const API_KEY =`${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
  // const token = getToken();
  // if (!token)
  // {
  //   return <Login setToken={setToken}/>
  // }

  console.log(token);
  return (
    <div className="App">
      <Navbar token={token} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        {/* For the personality test */}
        <Route element={<PrivateRoutes token={token} />}>
        <Route path="/personality-test" element={<PersonalityTest />} /> 
          <Route
            path="/accountinfo"
            element={<AccountInformation token={token} />}
          />
        </Route>
        <Route element={<PrivateRoutes token={token} />}>
          <Route
            path="/createorganization"
            element={<CreateOrganization token={token} />}
          />
        </Route>
        <Route element={<PrivateRoutes token={token} />}>
          <Route path="/createrequest/:orgId" element={<CreateRequest token={token}/>} />
        </Route>
        <Route element={<PrivateRoutes token={token} />}>
          <Route
            path="/myorganizations"
            element={<MyOrganizations token={token} />}
          />
        </Route>
        <Route element={<PrivateRoutes token={token} />}>
          <Route path="/myrequests" element={<MyRequests token={token} />} />
        </Route>
        <Route element={<PrivateRoutes token={token} />}>
          <Route
            path="/organizations/:orgId"
            element={<OrganizationDetails token={token} />}
          />
        </Route>
        <Route element={<PrivateRoutes token={token} />}>
          <Route
            path="/organizations/:orgId/members"
            element={<OrganizationRoster token={token} />}
          />
        </Route>
        <Route element={<PrivateRoutes token={token} />}>
          <Route
            path="/organizations/:orgId/items"
            element={<OrganizationItems token={token} />}
          />
        </Route>
        <Route element={<PrivateRoutes token={token} />}>
          <Route
            path="/organizations/:orgId/items/:itemId"
            element={<OrganizationItemDetails token={token} />}
          />
        </Route>
        <Route element={<PrivateRoutes token={token} />}>
          <Route
            path="/organizations/:orgId/items/create"
            element={<OrganizationItemCreate token={token} />}
          />
        </Route>
        <Route element={<PrivateRoutes token={token} />}>
          <Route
            path="/organizations/:orgId/locations"
            element={<OrganizationLocations token={token} />}
          />
        </Route>
        <Route element={<PrivateRoutes token={token} />}>
          <Route
            path="/organizations/:orgId/requests"
            element={<OrganizationRequests token={token} />}
          />
        </Route>
        <Route element={<PrivateRoutes token={token} />}>
          <Route
              path="/organizations/:orgId/locationinformation"
              element={<LocationInformation token={token} />}
          />
        </Route>
        <Route element={<PrivateRoutes token={token} />}>
          <Route
              path="/organizations/:orgId/itemstats"
              element={<ItemStats token={token} />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/404" element={<NotFound />} />
        {/*<Route path="/organizations/:orgId" element={<OrganizationDetails token={token}/>}>*/}
        {/*</Route>*/}
        <Route
          path="/listallorganizations"
          element={<ListAllOrganizations />}
        />
        <Route path="/allorganizationstatistics" element={<OrgChart />} />
      </Routes>
    </div>
  ); 
}

export default App;
