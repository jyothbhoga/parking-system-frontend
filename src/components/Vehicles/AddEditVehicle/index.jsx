import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Back from "../../../assets/images/back";
import config from "../../../common/config";
import { isEqualObjects } from "../../../common/helper";
import { useAddEditVehicles } from "../../../customHooks/useAddEditVehicles";
import { toastStateAtom } from "../../../jotai/commonAtom";
import { vehicleDataAtom } from "../../../jotai/vehiclesAtom";
import GenerateSticker from "./GenerateSticker";

const AddVehicleForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isEdit = location.pathname.includes(config.enumStaticUrls.edit);
  const vehicleId = isEdit && location.pathname.split("/")[3];
  const vehicleData = useAtomValue(vehicleDataAtom);
  const [isValidated, setValidation] = useState(false);
  const [isStickerDataValid, setStickerDataValid] = useState(false);
  const setToast = useSetAtom(toastStateAtom);

  const [stickerDataGen, setStickerDataGen] = useState({
    name: "",
    ownerName: "",
    stickerImgURL: null,
    type: "",
    roomNo: "",
    bldgName: "",
    regNo: "",
    contact: "",
  });
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
    contact: "",
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: <TODO: fix this dependancy issue>
  useEffect(() => {
    if (isEdit && vehicleData?.data?.length) {
      const vehicle = vehicleData.data.find((veh) => veh._id === vehicleId);
      setFormData({ ...vehicle });
      setStickerDataGen({ ...vehicle });
    } else if (isEdit) {
      getvehicleData();
    }
  }, []);

  useEffect(() => {
    const {
      name,
      ownerName,
      stickerImgURL,
      type,
      roomNo,
      bldgName,
      contact,
      regNo,
    } = formData;
    const commonValidation =
      name.length > 3 &&
      ownerName.length > 3 &&
      ["2 Wheeler", "4 Wheeler"].includes(type) &&
      roomNo.length > 2 &&
      regNo.length > 3 &&
      bldgName.length > 3 &&
      contact.length > 3;

    const stickerValidation =
      commonValidation &&
      (stickerDataGen ? !isEqualObjects(stickerDataGen, formData) : true);
    setStickerDataValid(stickerValidation);
    setValidation(
      commonValidation &&
        (stickerDataGen
          ? typeof stickerImgURL === "string"
            ? false
            : isEqualObjects(stickerDataGen, formData)
          : stickerImgURL),
    );
  }, [formData, stickerDataGen]);

  const getvehicleData = async () => {
    const vehicle = await fetchVehicleById(vehicleId);
    setFormData({ ...vehicle.vehicleData });
    setStickerDataGen({ ...vehicle.vehicleData });
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
    const {
      stickerImgURL,
      name,
      ownerName,
      type,
      regNo,
      bldgName,
      contact,
      roomNo,
    } = formData;
    data.append("stickerImgURL", stickerImgURL); // Append image file
    data.append("name", name); // Append text data
    data.append("ownerName", ownerName);
    data.append("type", type);
    data.append("regNo", regNo);
    data.append("bldgName", bldgName);
    data.append("contact", contact);
    data.append("roomNo", roomNo);
    const response = isEdit
      ? await updateVehicle(vehicleId, data)
      : await createVehicle(data);
    if (response.data.isSuccess === true) {
      setToast({
        key: isEdit ? "updateVehicleSuccess" : "createVehicleSuccess",
        show: true,
        message: response.data.data.message,
      });
      navigate(`/${config.enumStaticUrls.vehicleList}}`);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        margin: "0 auto",
        padding: 2,
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
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
          {isEdit ? "Update" : "Add"} Vehicle
        </Typography>
      </Box>

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

      {/* Owner Contact */}
      <TextField
        label="Contact"
        name="contact"
        variant="outlined"
        fullWidth
        value={formData.contact}
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
        disabled={isEdit}
      />

      {/* Vehicle Name */}
      <TextField
        label="Vehicle Name"
        name="name"
        variant="outlined"
        fullWidth
        value={formData.name}
        onChange={handleChange}
        required
        disabled={isEdit}
      />

      {/* Vehicle Type Dropdown */}
      <FormControl fullWidth required>
        <InputLabel>Vehicle Type</InputLabel>
        <Select
          name="type"
          value={formData.type}
          onChange={handleChange}
          label="Vehicle Type"
          disabled={isEdit}
        >
          {config.enumVehicleType.map((type) => (
            <MenuItem value={type.name} key={type.id}>
              {type.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Wing Dropdown */}
      <FormControl fullWidth required>
        <InputLabel>Wing</InputLabel>
        <Select
          name="bldgName"
          value={formData.bldgName}
          onChange={handleChange}
          label="Wing"
        >
          {config.enumBldgNames.map((bldg) => (
            <MenuItem value={bldg.name} key={bldg.id}>
              {bldg.name}
            </MenuItem>
          ))}
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

      <GenerateSticker
        vehicleData={formData}
        setFormData={setFormData}
        isStickerDataValid={isStickerDataValid}
        setStickerDataGen={setStickerDataGen}
      />

      {/* Add Vehicle Button */}
      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        sx={{ color: "#fff" }}
        disabled={!isValidated}
      >
        {isEdit ? "Update" : "Add"} Vehicle
      </Button>
    </Box>
  );
};

export default AddVehicleForm;
