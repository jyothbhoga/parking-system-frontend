import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

function ViewVehicle() {
  const location = useLocation();
  const { formData } = location.state || {};

  return (
    <Box sx={{ maxWidth: 400, margin: '0 auto', padding: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Vehicle Details
      </Typography>
      {formData ? (
        <List>
          <ListItem>
            <ListItemText primary="Vehicle Name" secondary={formData.vehicleName} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Owner Name" secondary={formData.ownerName} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Vehicle Type" secondary={formData.vehicleType} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Room No" secondary={formData.roomNo} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Building Name" secondary={formData.buildingName} />
          </ListItem>
          {formData.vehicleImage && (
            <ListItem>
              <ListItemText primary="Vehicle Image" secondary={formData.vehicleImage.name} />
            </ListItem>
          )}
        </List>
      ) : (
        <Typography>No data available</Typography>
      )}
    </Box>
  );
}

export default ViewVehicle;
