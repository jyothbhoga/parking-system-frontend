import React, { useState } from "react";
import {
  Container,
  List,
  ListItem,
  Typography,
  Paper,
  Pagination,
  Box,
  Button,
} from "@mui/material";
import config from "../../common/config";
import ViewIcon from "../../assets/images/view";
import EditIcon from "../../assets/images/edit";
import DeleteIcon from "../../assets/images/delete";
import FileDownloadIcon from "../../assets/images/download";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "../../common/Popup/Delete";
// Sample data (replace with your actual data fetching logic)
const sampleData = [
  {
    srNo: 1,
    ownerName: "Category 1",
    regNo: "John Doe",
    type: "john.doe@example.com",
  },
  {
    srNo: 2,
    ownerName: "Category 1",
    regNo: "Jane Smith",
    type: "jane.smith@example.com",
  },
  {
    srNo: 3,
    ownerName: "Category 2",
    regNo: "Alice Johnson",
    type: "alice.johnson@example.com",
  },
  {
    srNo: 4,
    ownerName: "Category 2",
    regNo: "Bob Brown",
    type: "bob.brown@example.com",
  },
  {
    srNo: 5,
    ownerName: "Category 3",
    regNo: "Carol White",
    type: "carol.white@example.com",
  },
  {
    srNo: 6,
    ownerName: "Category 3",
    regNo: "David Green",
    type: "david.green@example.com",
  },
  {
    srNo: 7,
    ownerName: "Category 1",
    regNo: "Emma Blue",
    type: "emma.blue@example.com",
  },
  {
    srNo: 8,
    ownerName: "Category 2",
    regNo: "Frank Black",
    type: "frank.black@example.com",
  },
  {
    srNo: 9,
    ownerName: "Category 3",
    regNo: "Grace Red",
    type: "grace.red@example.com",
  },
  {
    srNo: 10,
    ownerName: "Category 1",
    regNo: "Henry Grey",
    type: "henry.grey@example.com",
  },
  {
    srNo: 11,
    ownerName: "Category 2",
    regNo: "Ivy Yellow",
    type: "ivy.yellow@example.com",
  },
  {
    srNo: 12,
    ownerName: "Category 3",
    regNo: "Jack Orange",
    type: "jack.orange@example.com",
  },
];

const PaginatedTable = () => {
  const [page, setPage] = useState(1);
  const rowsPerPage = config.enumRowsPerPage;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    console.log("hey ther");
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
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedData = sampleData.slice(startIndex, startIndex + rowsPerPage);

  return (
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
          {paginatedData.map((record) => (
            <ListItem key={record.srNo}>
              <Box sx={{ width: "20%", textAlign: "center" }}>
                {record.srNo}
              </Box>
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
                <ViewIcon style={{ cursor: "pointer" }} />
                <EditIcon style={{ cursor: "pointer" }} />
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
          count={Math.ceil(sampleData.length / rowsPerPage)}
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
