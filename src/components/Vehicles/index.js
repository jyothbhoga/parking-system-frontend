import React, { useEffect, useState } from "react";
import {
  Container,
  List,
  ListItem,
  Typography,
  Paper,
  Box,
  Button,
  Backdrop,
  CircularProgress,
  useTheme,
  useMediaQuery,
  IconButton,
  Popover,
  TablePagination,
} from "@mui/material";
import config from "../../common/config";
import ViewIcon from "../../assets/images/view";
import EditIcon from "../../assets/images/edit";
import DeleteIcon from "../../assets/images/delete";
import FileDownloadIcon from "../../assets/images/download";
import { useNavigate } from "react-router-dom";
import DelConfModal from "../../common/Popup/Delete";
import { useAtomValue, useSetAtom } from "jotai";
import { loadingAtom, vehicleDataAtom } from "../../jotai/vehiclesAtom";
import { useAddEditVehicles } from "../../customHooks/useAddEditVehicles";
import { deleteCookie, downloadBlob } from "../../common/helper";
import { toastStateAtom } from "../../jotai/commonAtom";
import More from "../../assets/images/more";

const PaginatedTable = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const vehiclesAtom = useAtomValue(vehicleDataAtom);
  const vehiclesLoadingAtom = useAtomValue(loadingAtom);
  const setToast = useSetAtom(toastStateAtom);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [anchorEl, setAnchorEl] = useState(null);
  const [activePopoverId, setActivePopoverId] = useState(null);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setActivePopoverId(id);
  };

  const handleCloseAnchor = () => {
    setAnchorEl(null);
    setActivePopoverId(null);
  };

  const { fetchVehicles, deleteVehicle } = useAddEditVehicles();

  useEffect(() => {
    fetchVehicles(page, rowsPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage]);

  const openDelConfPopup = (vehicle) => {
    handleCloseAnchor();
    setOpen(true);
    setSelectedVehicle(vehicle);
  };

  const closeDelConfPopup = () => setOpen(false);
  const handleConfirm = async () => {
    const response = await deleteVehicle(selectedVehicle._id);
    if (response.data.isSuccess === true) {
      setToast({
        key: "deleteVehicleSuccess",
        show: true,
        message: response.data.data.message,
      });
      fetchVehicles(page, rowsPerPage);
    }
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onLogout = () => {
    deleteCookie("token");
  };

  const handleDownload = (fileUrl, filename) => {
    downloadBlob(fileUrl, filename);
  };

  const openPopup = Boolean(anchorEl);
  const id = openPopup ? "simple-popover" : undefined;

  // Get the subset of data for the current page
  return vehiclesLoadingAtom ? (
    <Backdrop open={open} onClick={closeDelConfPopup}>
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : (
    <Container
      style={{ position: "relative", padding: isMobile ? "10px" : "20px" }}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h6" component="div" sx={{ margin: 2 }}>
          Vehicles List
        </Typography>
        <Box>
          <Button
            onClick={() =>
              navigate(
                `/${config.enumStaticUrls.vehicleList}/${config.enumStaticUrls.add}`
              )
            }
            variant="contained"
            color="primary"
            sx={{ color: "#fff", marginRight: isMobile ? "10px" : "20px" }}
          >
            Add vehicle
          </Button>
          <Button
            onClick={onLogout}
            variant="contained"
            color="primary"
            sx={{ color: "#fff" }}
          >
            Logout
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <List
          sx={{
            border: "1px solid #ccc",
            borderRadius: 1,
            overflowX: "auto",
            width: "100%",
            minWidth: isMobile ? "320px" : "600px",
          }}
        >
          {/* Header Row */}
          <ListItem
            sx={{
              backgroundColor: "#90caf9",
              fontWeight: "bold",
              display: "flex",
            }}
          >
            <Box sx={{ width: isMobile ? "10%" : "20%", textAlign: "center" }}>
              Sr No.
            </Box>
            <Box sx={{ width: isMobile ? "30%" : "20%", textAlign: "center" }}>
              Owner Name
            </Box>
            <Box sx={{ width: isMobile ? "30%" : "20%", textAlign: "center" }}>
              Reg No
            </Box>
            <Box sx={{ width: isMobile ? "20%" : "20%", textAlign: "center" }}>
              Vehicle Type
            </Box>
            {isMobile ? null : (
              <Box sx={{ width: "20%", textAlign: "center" }}>Actions</Box>
            )}
          </ListItem>

          {/* Data Rows */}
          {vehiclesAtom?.data?.length ? (
            vehiclesAtom?.data?.map((record, ind) => (
              <ListItem
                key={record._id}
                sx={{
                  display: "flex",
                  padding: isMobile ? "10px 0" : "10px",
                }}
              >
                <Box
                  sx={{ width: isMobile ? "10%" : "20%", textAlign: "center" }}
                >
                  {ind + 1}
                </Box>
                <Box
                  sx={{ width: isMobile ? "30%" : "20%", textAlign: "center" }}
                >
                  {record.ownerName}
                </Box>
                <Box
                  sx={{ width: isMobile ? "30%" : "20%", textAlign: "center" }}
                >
                  {record.regNo}
                </Box>
                <Box
                  sx={{ width: isMobile ? "20%" : "20%", textAlign: "center" }}
                >
                  {record.type}
                </Box>
                {isMobile ? (
                  <>
                    {/* Kebab Icon for Mobile */}
                    <IconButton
                      onClick={(event) => handleClick(event, record._id)}
                    >
                      <More style={{ fill: "#fff" }} />
                    </IconButton>
                    <Popover
                      id={id}
                      open={activePopoverId === record._id && openPopup}
                      anchorEl={anchorEl}
                      onClose={handleCloseAnchor}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          padding: 1,
                        }}
                      >
                        <IconButton
                          onClick={() => {
                            navigate(
                              `/${config.enumStaticUrls.vehicleList}/${config.enumStaticUrls.view}/${record._id}`
                            );
                            closeDelConfPopup();
                          }}
                          sx={{ justifyContent: "normal", gap: "5px" }}
                        >
                          <ViewIcon style={{ fill: "#fff" }} />
                          <Typography variant="caption">View</Typography>
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            navigate(
                              `/${config.enumStaticUrls.vehicleList}/${config.enumStaticUrls.edit}/${record._id}`
                            );
                            closeDelConfPopup();
                          }}
                          sx={{ justifyContent: "normal", gap: "5px" }}
                        >
                          <EditIcon style={{ fill: "#fff" }} />
                          <Typography variant="caption">Edit</Typography>
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            closeDelConfPopup();
                            openDelConfPopup(record);
                          }}
                          sx={{ justifyContent: "normal", gap: "5px" }}
                        >
                          <DeleteIcon style={{ fill: "#fff" }} />
                          <Typography variant="caption">Delete</Typography>
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            handleDownload(
                              `${record.stickerImgURL}?v=${Date.now()}`,
                              `${record.regNo
                                .toString()
                                .toLowerCase()
                                .replace(/\s+/g, "_")}.png`
                            );
                            closeDelConfPopup();
                          }}
                          sx={{ justifyContent: "normal", gap: "5px" }}
                        >
                          <FileDownloadIcon style={{ fill: "#fff" }} />
                          <Typography variant="caption">Download</Typography>
                        </IconButton>
                      </Box>
                    </Popover>
                  </>
                ) : (
                  <Box
                    sx={{
                      width: "20%",
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <ViewIcon
                      style={{
                        cursor: "pointer",
                        fill: "#fff",
                        marginRight: "10px",
                      }}
                      onClick={() =>
                        navigate(
                          `/${config.enumStaticUrls.vehicleList}/${config.enumStaticUrls.view}/${record._id}`
                        )
                      }
                    />
                    <EditIcon
                      style={{
                        cursor: "pointer",
                        fill: "#fff",
                        marginRight: "10px",
                      }}
                      onClick={() =>
                        navigate(
                          `/${config.enumStaticUrls.vehicleList}/${config.enumStaticUrls.edit}/${record._id}`
                        )
                      }
                    />
                    <DeleteIcon
                      style={{
                        cursor: "pointer",
                        fill: "#fff",
                        marginRight: "10px",
                      }}
                      onClick={() => openDelConfPopup(record)}
                    />
                    <FileDownloadIcon
                      style={{ cursor: "pointer", fill: "#fff" }}
                      onClick={() =>
                        handleDownload(
                          `${record.stickerImgURL}?v=${Date.now()}`,
                          `${record.regNo
                            .toString()
                            .toLowerCase()
                            .replace(/\s+/g, "_")}.png`
                        )
                      }
                    />
                  </Box>
                )}
              </ListItem>
            ))
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "400px",
              }}
            >
              No Vehicles Added yet
            </Box>
          )}
        </List>

        <Paper
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            height: "50px",
            paddingRight: "20px",
            marginTop: "20px",
          }}
        >
          {/* <Pagination
            count={vehiclesAtom.totalPages}
            page={page}
            onChange={handleChangePage}
            color="primary"
          /> */}
          <TablePagination
            component="div"
            count={vehiclesAtom.totalCount}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>

      <DelConfModal
        open={open}
        onClose={closeDelConfPopup}
        onConfirm={handleConfirm}
        selectedVehicle={selectedVehicle}
      />
    </Container>
  );
};

export default PaginatedTable;
