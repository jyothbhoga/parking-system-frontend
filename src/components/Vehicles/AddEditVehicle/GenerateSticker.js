import React, { memo, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react"; // Import QRCodeCanvas for QR code generation
import {
  Button,
  Box,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
// import { toPng } from "html-to-image";
import { blobToFile, dataURLToBlob } from "../../../common/helper";
import html2canvas from "html2canvas";

const QRCodeGenerator = memo(
  ({ vehicleData, setFormData, isStickerDataValid, setStickerDataGen }) => {
    const [imageURL, setImageURL] = useState(""); // State to control QR code visibility
    const [generatingImg, setGeneratingImg] = useState(false);
    const placeholderRef = useRef(null);
    const vehicleDetails = {
      ownerName: vehicleData.ownerName,
      regNo: vehicleData.regNo,
      type: vehicleData.type,
      roomNo: vehicleData.roomNo,
      bldgName: vehicleData.bldgName,
    };

    const qrData = JSON.stringify(vehicleDetails);

    // Function to generate the image and store it
    const handleGenerateImage = () => {
      setGeneratingImg(true);
      if (placeholderRef.current) {
        html2canvas(placeholderRef.current, { scale: 4 }) // Higher scale for better resolution
          .then(async (canvas) => {
            const dataUrl = canvas.toDataURL("image/png");
            const blob = dataURLToBlob(dataUrl);

            const file = blobToFile(blob, `${vehicleData.regNo}.png`);
            setFormData({ ...vehicleData, stickerImgURL: file });
            setStickerDataGen({ ...vehicleData, stickerImgURL: file });
            setImageURL(URL.createObjectURL(blob));
            setGeneratingImg(false);
          })
          .catch((error) => {
            console.error("Error generating image:", error);
          });
      } else {
        console.error("Placeholder reference is null.");
      }
    };

    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Vehicle QR Code Generator
        </Typography>
        {/* Button to generate the QR code */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerateImage}
          sx={{ mt: 3 }}
          disabled={!isStickerDataValid}
        >
          Generate Image
        </Button>
        {/* Conditional rendering for placeholder and QR code */}
        <Paper
          ref={placeholderRef}
          elevation={3}
          sx={{
            position: "relative",
            width: "400px",
            height: "400px",
            margin: "20px auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundImage: `url('https://via.placeholder.com/400')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "50%",
          }}
        >
          {/* QR Code Overlay */}
          <QRCodeCanvas
            value={qrData}
            size={200}
            style={{
              position: "absolute",
              top: "62%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              border: "10px solid #fff",
            }}
          />
        </Paper>
        {/* Display the generated image below */}
        {generatingImg ? (
          <CircularProgress />
        ) : (
          vehicleData.stickerImgURL && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6">Generated Image:</Typography>
              <Paper
                elevation={3}
                sx={{
                  margin: "0 auto",
                  p: 2, // shorthand for padding
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src={imageURL || vehicleData.stickerImgURL}
                  alt="Generated QR Code"
                  style={{ maxWidth: "100%" }}
                />
              </Paper>
            </Box>
          )
        )}
      </Box>
    );
  }
);

export default QRCodeGenerator;
