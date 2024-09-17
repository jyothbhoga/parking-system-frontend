import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import { decryptData } from "../../../common/helper";

const ViewTokenisedVehicle = () => {
  const location = useLocation();
  const params = location.search
    .slice(1)
    .split("&")
    .reduce((acc, s) => {
      const [k, v] = s.split("=");
      return Object.assign(acc, { [k]: v });
    }, {});

  const currVehicle = JSON.parse(decryptData(params.token));

  return (
    <Box sx={{ maxWidth: 400, margin: "0 auto", padding: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "normal",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{ margin: "0 auto 0.35em" }}
        >
          Vehicle Details
        </Typography>
      </Box>
      {currVehicle ? (
        <List>
          <ListItem sx={{ textAlign: "center" }}>
            <ListItemText
              primary="Owner Name"
              secondary={currVehicle.ownerName}
            />
          </ListItem>
          <ListItem sx={{ textAlign: "center" }}>
            <ListItemText
              primary="Registration Nuumber"
              secondary={currVehicle.regNo}
            />
          </ListItem>
          <ListItem sx={{ textAlign: "center" }}>
            <ListItemText primary="Vehicle Type" secondary={currVehicle.type} />
          </ListItem>
          <ListItem sx={{ textAlign: "center" }}>
            <ListItemText primary="Room No" secondary={currVehicle.roomNo} />
          </ListItem>
          <ListItem sx={{ textAlign: "center" }}>
            <ListItemText
              primary="Building Name"
              secondary={currVehicle.bldgName}
            />
          </ListItem>
        </List>
      ) : (
        <Typography>No data available</Typography>
      )}
    </Box>
  );
};

export default ViewTokenisedVehicle;
