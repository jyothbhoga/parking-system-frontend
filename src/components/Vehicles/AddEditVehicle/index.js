import React, { useEffect, useState } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";
import config from "../../../common/config";
import { useAtomValue } from "jotai";
import { useAddEditVehicles } from "../../../customHooks/useAddEditVehicles";
import { vehicleDataAtom } from "../../../jotai/vehiclesAtom";
import GenerateSticker from "./GenerateSticker";

const AddVehicleForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isEdit = location.pathname.includes(config.enumStaticUrls.edit);
  const vehicleId = isEdit && location.pathname.split("/")[3];
  const vehicleData = useAtomValue(vehicleDataAtom);
  const { fetchVehicleById, createVehicle, updateVehicle } =
    useAddEditVehicles();
  const [formData, setFormData] = useState({
    name: "",
    ownerName: "",
    stickerImgURL: null,
    type: "",
    roomNo: "",
    bldgName: "",
    regNo: "",
  });

  useEffect(() => {
    if (isEdit) {
      if (vehicleData?.data?.length) {
        let vehicle;
        vehicle = vehicleData?.data.find((veh) => veh._id === vehicleId);
        setFormData({
          name: vehicle.name,
          ownerName: vehicle.ownerName,
          stickerImgURL: vehicle.stickerImgURL,
          type: vehicle.type,
          roomNo: vehicle.roomNo,
          bldgName: vehicle.bldgName,
          regNo: vehicle.regNo,
        });
      } else {
        getvehicleData();
      }
    }
  }, []);

  const getvehicleData = async () => {
    const vehicle = await fetchVehicleById(vehicleId);
    setFormData({
      name: vehicle.name,
      ownerName: vehicle.ownerName,
      stickerImgURL: vehicle.stickerImgURL,
      type: vehicle.type,
      roomNo: vehicle.roomNo,
      bldgName: vehicle.bldgName,
      regNo: vehicle.regNo,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const data = new FormData();
    const { stickerImgURL, name, ownerName, type, regNo, bldgName, roomNo } =
      formData;
    data.append("stickerImgURL", stickerImgURL); // Append image file
    data.append("name", name); // Append text data
    data.append("ownerName", ownerName);
    data.append("type", type);
    data.append("regNo", regNo);
    data.append("bldgName", bldgName);
    data.append("roomNo", roomNo);
    const res = isEdit
      ? await updateVehicle(vehicleId, data)
      : await createVehicle(data);
    res && navigate(`/${config.enumStaticUrls.vehicleList}}`);
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
    >
      <Typography variant="h5" component="h2" gutterBottom>
        {isEdit ? "Update" : "Add"} Vehicle
      </Typography>

      {/* Vehicle Name */}
      <TextField
        label="Vehicle Name"
        name="name"
        variant="outlined"
        fullWidth
        value={formData.name}
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

      {/* Vehicle Type Dropdown */}
      <FormControl fullWidth required>
        <InputLabel>Vehicle Type</InputLabel>
        <Select
          name="type"
          value={formData.type}
          onChange={handleChange}
          label="Vehicle Type"
        >
          <MenuItem value="2 wheeler">2 Wheeler</MenuItem>
          <MenuItem value="4 wheeler">4 Wheeler</MenuItem>
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
          name="bldgName"
          value={formData.bldgName}
          onChange={handleChange}
          label="Building Name"
        >
          <MenuItem value="Satyam">Satyam</MenuItem>
          <MenuItem value="Shivam">Shivam</MenuItem>
          <MenuItem value="Sundaram">Sundaram</MenuItem>
        </Select>
      </FormControl>
      <GenerateSticker vehicleData={formData} setFormData={setFormData} />

      {/* Add Vehicle Button */}
      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        sx={{ color: "#fff" }}
      >
        {isEdit ? "Update" : "Add"} Vehicle
      </Button>
    </Box>
  );
};

export default AddVehicleForm;
