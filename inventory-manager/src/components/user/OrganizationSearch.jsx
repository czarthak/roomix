import { useState, useEffect} from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Axios from "axios";

  export function OrganizationSearch() {

    const [data, setRows] = useState([]); // State to store the rows
  
    useEffect(() => {
      const fetchOrganizations = async () => {
        try {
          const response = await Axios.get("http://localhost:8080/organization/all");
          console.log(response.data[0].name);
          //setRows(response.data); // Update state with fetched data
          setRows(response.data.map(org => org.name));
        } catch (error) {
          console.error('Error fetching data: ', error);
          
        }
      };
  
      fetchOrganizations();
    }, []); // The empty array ensures this effect runs once on mount
    
    const SearchBar = ({setSearchQuery}) => (
        <form>
          <TextField
            id="search-bar"
            className="text"
            onInput={(e) => {
              setSearchQuery(e.target.value);
            }}
            label="Enter an organization name"
            variant="outlined"
            placeholder="Search..."
            size="small"
          />
          <IconButton type="submit" aria-label="search">
            <SearchIcon style={{ fill: "blue" }} />
          </IconButton>
        </form>
      );
    
      const filterData = (query, data) => {
        if (!query) {
          return data;
        } else {
          return data.filter((d) => d.toLowerCase().includes(query));
        }
      };

    const [searchQuery, setSearchQuery] = useState("");
    const dataFiltered = filterData(searchQuery, data);
  
    return (
      <div
        style={{
          display: "flex",
          alignSelf: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: 20
        }}
      >
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div style={{ padding: 3 }}>
          {dataFiltered.map((d) => (
            <div
              className="text"
              style={{
                padding: 5,
                justifyContent: "normal",
                fontSize: 20,
                color: "blue",
                margin: 1,
                width: "250px",
                BorderColor: "green",
                borderWidth: "10px"
              }}
              key={d.id}
            >
              {d}
            </div>
          ))}
        </div>
      </div>
    );
  }

export default OrganizationSearch;
