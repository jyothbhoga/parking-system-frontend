import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import { useAtom, useAtomValue } from "jotai";
import {
  currVehicleDataAtom,
  vehicleDataAtom,
} from "../../../jotai/vehiclesAtom";
import { useAddEditVehicles } from "../../../customHooks/useAddEditVehicles";
import Back from "../../../assets/images/back";
import config from "../../../common/config";
import { getFormattedDate } from "../../../common/helper";

const ViewVehicle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const vehicleId = location.pathname.split("/")[3];
  const vehicleData = useAtomValue(vehicleDataAtom);
  const { fetchVehicleById } = useAddEditVehicles();
  const [currVehicle, setCurrentVehicle] = useAtom(currVehicleDataAtom);
  const [createdDate, setCreatedDate] = useState("");

  useEffect(() => {
    if (vehicleData?.data?.length) {
      let vehicle;
      vehicle = vehicleData?.data.find((veh) => veh._id === vehicleId);
      setCurrentVehicle(vehicle);
    } else {
      fetchVehicleById(vehicleId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCreatedDate(
      getFormattedDate(currVehicle.createdAt, "DD:MM:YYYY HH:MM:SS")
    );
  }, [currVehicle]);

  return (
    <Box sx={{ maxWidth: 400, margin: "0 auto", padding: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "normal",
          alignItems: "center",
        }}
      >
        <Box>
          <Back
            onClick={() => navigate(`/${config.enumStaticUrls.vehicleList}}`)}
            style={{ cursor: "pointer", fill: "#fff" }}
          />
        </Box>
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
            <ListItemText
              primary="Registration Nuumber"
              secondary={currVehicle.regNo}
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
          <ListItem>
            <ListItemText primary="Created On" secondary={createdDate} />
          </ListItem>
          {currVehicle.stickerImgURL && (
            <ListItem>
              <ListItemText
                primary="Vehicle Image"
                secondary={currVehicle.name}
              />
              <img
                src={`${currVehicle.stickerImgURL}?v=${Date.now()}`}
                alt={currVehicle.name}
                width={"100%"}
              />
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
