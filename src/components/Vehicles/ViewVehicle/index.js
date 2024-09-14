import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import { useAtom, useAtomValue } from "jotai";
import {
  currVehicleDataAtom,
  vehicleDataAtom,
} from "../../../jotai/vehiclesAtom";
import { useAddEditVehicles } from "../../../customHooks/useAddEditVehicles";

const ViewVehicle = () => {
  const location = useLocation();
  const vehicleId = location.pathname.split("/")[2];
  const vehicleData = useAtomValue(vehicleDataAtom);
  const { fetchVehicleById } = useAddEditVehicles();
  const [currVehicle, setCurrentVehicle] = useAtom(currVehicleDataAtom);
  useEffect(() => {
    if (vehicleData?.data?.length) {
      let vehicle;
      vehicle = vehicleData?.data.find((veh) => veh._id === vehicleId);
      setCurrentVehicle(vehicle);
    } else {
      fetchVehicleById(vehicleId);
    }
  }, []);

  return (
    <Box sx={{ maxWidth: 400, margin: "0 auto", padding: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Vehicle Details
      </Typography>
      {currVehicle ? (
        <List>
          <ListItem>
            <ListItemText primary="Vehicle Name" secondary={currVehicle.name} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Owner Name"
              secondary={currVehicle.ownerName}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="Vehicle Type" secondary={currVehicle.type} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Room No" secondary={currVehicle.roomNo} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Building Name"
              secondary={currVehicle.bldgName}
            />
          </ListItem>
          {currVehicle.stickerImgURL && (
            <ListItem>
              <ListItemText
                primary="Vehicle Image"
                secondary={currVehicle.name}
              />
              <img src={currVehicle.stickerImgURL} alt={currVehicle.name} />
            </ListItem>
          )}
        </List>
      ) : (
        <Typography>No data available</Typography>
      )}
    </Box>
  );
};

export default ViewVehicle;
