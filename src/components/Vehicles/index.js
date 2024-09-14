import React, { useEffect, useState } from "react";
import {
  Container,
  List,
  ListItem,
  Typography,
  Paper,
  Pagination,
  Box,
  Button,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import config from "../../common/config";
import ViewIcon from "../../assets/images/view";
import EditIcon from "../../assets/images/edit";
import DeleteIcon from "../../assets/images/delete";
import FileDownloadIcon from "../../assets/images/download";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "../../common/Popup/Delete";
import { useAtomValue } from "jotai";
import { loadingAtom, vehicleDataAtom } from "../../jotai/vehiclesAtom";
import { useAddEditVehicles } from "../../customHooks/useAddEditVehicles";
// Sample data (replace with your actual data fetching logic)

const PaginatedTable = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const vehiclesAtom = useAtomValue(vehicleDataAtom);
  const vehiclesLoadingAtom = useAtomValue(loadingAtom);

  const { fetchVehicles } = useAddEditVehicles();

  useEffect(() => {
    fetchVehicles(page, config.pageLimit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const handleConfirm = () => {
    // Handle the deletion logic here
    console.log("Item deleted");
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Get the subset of data for the current page
  return vehiclesLoadingAtom ? (
    <Backdrop open={open} onClick={handleClose}>
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : (
    <Container>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h6" component="div" sx={{ margin: 2 }}>
          Vehicles List
        </Typography>
        <Button
          onClick={() => navigate(`/${config.enumStaticUrls.add}`)}
          variant="contained"
          color="primary"
        >
          Add vehicle
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <List
          sx={{ border: "1px solid #ccc", borderRadius: 1, overflowX: "auto" }}
        >
          {/* Header Row */}
          <ListItem sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>
            <Box sx={{ width: "20%", textAlign: "center" }}>Sr No.</Box>
            <Box sx={{ width: "20%", textAlign: "center" }}>
              Name of the Owner
            </Box>
            <Box sx={{ width: "20%", textAlign: "center" }}>Reg No</Box>
            <Box sx={{ width: "20%", textAlign: "center" }}>
              Type of Vehicle
            </Box>
            <Box sx={{ width: "20%", textAlign: "center" }}>Actions</Box>
          </ListItem>

          {/* Data Rows */}
          {vehiclesAtom?.data?.map((record, ind) => (
            <ListItem key={record._id}>
              <Box sx={{ width: "20%", textAlign: "center" }}>{ind + 1}</Box>
              <Box sx={{ width: "20%", textAlign: "center" }}>
                {record.ownerName}
              </Box>
              <Box sx={{ width: "20%", textAlign: "center" }}>
                {record.regNo}
              </Box>
              <Box sx={{ width: "20%", textAlign: "center" }}>
                {record.type}
              </Box>
              <Box sx={{ width: "20%", textAlign: "center" }}>
                <ViewIcon
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate(`/${config.enumStaticUrls.view}/${record._id}`)
                  }
                />
                <EditIcon
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate(`/${config.enumStaticUrls.edit}/${record._id}`)
                  }
                />
                <DeleteIcon
                  onClick={handleOpen}
                  style={{ cursor: "pointer" }}
                />
                <FileDownloadIcon style={{ cursor: "pointer" }} />
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
      <Paper sx={{ padding: 2, display: "flex", justifyContent: "center" }}>
        <Pagination
          count={vehiclesAtom.totalPages}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Paper>
      <DeleteConfirmationModal
        open={open}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </Container>
  );
};

export default PaginatedTable;
