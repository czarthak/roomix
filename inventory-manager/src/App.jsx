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
import useToken from "./components/useToken";
import AccountInformation from "./components/user/AccountInformation";
import PrivateRoutes from "./routes/PrivateRoutes";
import NotFound from "./components/error/NotFound";

import Dashboard2 from "./components/map/Dashboard";
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
        <Route element={<PrivateRoutes token={token} />}>
          <Route path="/dashboard/:userEmail" element={<Dashboard2 token={token} />} />
        </Route>
        <Route path="/personality-test" element={<PersonalityTest />} /> 
          <Route
            path="/accountinfo"
            element={<AccountInformation token={token} />}
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
      </Routes>
    </div>
  ); 
}

export default App;
