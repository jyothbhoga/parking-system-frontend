import React, { useState } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Box,
  Typography,
  InputLabel,
  FormControl,
  Select,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import config from "../../../common/config";

function AddVehicleForm() {
  const [formData, setFormData] = useState({
    vehicleName: "",
    ownerName: "",
    vehicleImage: null,
    vehicleType: "",
    roomNo: "",
    buildingName: "",
    regNo: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      vehicleImage: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to the display page and pass formData using the `state` prop
    navigate(`/${config.enumStaticUrls.view}/1`, { state: { formData } });
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        justifyContent: "center",
        maxWidth: 400,
        margin: "0 auto",
        padding: 2,
        borderRadius: 2,
        boxShadow: 2,
      }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        Add Vehicle
      </Typography>

      {/* Vehicle Name */}
      <TextField
        label="Vehicle Name"
        name="vehicleName"
        variant="outlined"
        fullWidth
        value={formData.vehicleName}
        onChange={handleChange}
        required
      />

      {/* Owner Name */}
      <TextField
        label="Owner Name"
        name="ownerName"
        variant="outlined"
        fullWidth
        value={formData.ownerName}
        onChange={handleChange}
        required
      />

      {/* Registration Number of vehicle */}
      <TextField
        label="Registration Number"
        name="regNo"
        variant="outlined"
        fullWidth
        value={formData.regNo}
        onChange={handleChange}
        required
      />

      {/* Vehicle Image */}
      <Button variant="contained" component="label" fullWidth>
        Upload Vehicle Image
        <input type="file" hidden onChange={handleFileChange} required />
      </Button>

      {/* Vehicle Type Dropdown */}
      <FormControl fullWidth required>
        <InputLabel>Vehicle Type</InputLabel>
        <Select
          name="vehicleType"
          value={formData.vehicleType}
          onChange={handleChange}
          label="Vehicle Type"
        >
          <MenuItem value="2-wheeler">2 Wheeler</MenuItem>
          <MenuItem value="4-wheeler">4 Wheeler</MenuItem>
        </Select>
      </FormControl>

      {/* Room No */}
      <TextField
        label="Room No"
        name="roomNo"
        variant="outlined"
        fullWidth
        value={formData.roomNo}
        onChange={handleChange}
        required
      />

      {/* Building Name Dropdown */}
      <FormControl fullWidth required>
        <InputLabel>Building Name</InputLabel>
        <Select
          name="buildingName"
          value={formData.buildingName}
          onChange={handleChange}
          label="Building Name"
        >
          <MenuItem value="A-wing">A Wing</MenuItem>
          <MenuItem value="B-wing">B Wing</MenuItem>
          <MenuItem value="C-wing">C Wing</MenuItem>
        </Select>
      </FormControl>

      {/* Add Vehicle Button */}
      <Button type="submit" variant="contained" color="primary">
        Add Vehicle
      </Button>
    </Box>
  );
}

export default AddVehicleForm;
