import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Typography, CardActions, Button, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const ListAllOrganizations = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [filterMajor, setFilterMajor] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [filterBudget, setFilterBudget] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await Axios.get("http://localhost:8080/user/all");
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.fname.toLowerCase().includes(searchInput.toLowerCase()) ||
    user.lname.toLowerCase().includes(searchInput.toLowerCase())
  ).filter(user =>
    (filterMajor ? user.major === filterMajor : true) &&
    (filterYear ? user.year === filterYear : true) && (filterBudget ? user.budget <= filterBudget : true)
  );

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <TextField
        label="Search by Name"
        variant="outlined"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        sx={{ mb: 2, width: '100%' }}
      />

      <FormControl sx={{ mb: 2, minWidth: 120 }}>
        <InputLabel id="major-select-label">Major</InputLabel>
        <Select
          labelId="major-select-label"
          id="major-select"
          value={filterMajor}
          label="Major"
          onChange={(e) => setFilterMajor(e.target.value)}
          size="small" // This prop affects the inner input but not the form control size directly
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Computer Science">Computer Science</MenuItem>
          <MenuItem value="Engineering">Engineering</MenuItem>
          <MenuItem value="Business">Business</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ mb: 4, minWidth: 120 }}>
        <InputLabel id="year-select-label">Year</InputLabel>
        <Select
          labelId="year-select-label"
          id="year-select"
          value={filterYear}
          label="Year"
          onChange={(e) => setFilterYear(e.target.value)}
          size="small" // Similar to above
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Freshman">Freshman</MenuItem>
          <MenuItem value="Sophomore">Sophomore</MenuItem>
          <MenuItem value="Junior">Junior</MenuItem>
          <MenuItem value="Senior">Senior</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ mb: 4, minWidth: 120 }}>
      <InputLabel id="budget-select-label">Budget</InputLabel>
      <Select
        labelId="budget-select-label"
        id="budget-select"
        value={filterBudget}
        label="Budget"
        onChange={(e) => setFilterBudget(e.target.value)}
        size="small"
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="500">Less than $500</MenuItem>
        <MenuItem value="800">Less than $800</MenuItem>
        <MenuItem value="1000">Less than $1000</MenuItem>
        <MenuItem value="1200">Less than $1200</MenuItem>
        <MenuItem value="1500">Less than 1500</MenuItem>
      </Select>
    </FormControl>



      

      <Grid container spacing={2}>
        {filteredUsers.map((user, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {user.fname} {user.lname}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Email: {user.email}
                </Typography>
                <Typography variant="body2">
                  Phone: {user.phoneNumber}
                </Typography>
                <Typography variant="body2">
                  Major: {user.major}
                </Typography>
                <Typography variant="body2">
                  Year: {user.year}
                </Typography>
                <Typography variant="body2">
                  Budget: {user.budget}
                </Typography>
                <Typography variant="body2">
                  Personality Type: {user.personalTrait}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => navigate(`/users/${user.email}/details`)}>View Details</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export { ListAllOrganizations };
