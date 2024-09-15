import * as React from "react";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import { memo } from "react";
import { useAtom } from "jotai";
import { toastStateAtom } from "../../jotai/commonAtom";
import config from "../config";

const Toast = memo(({ message }) => {
  const [toast, setToast] = useAtom(toastStateAtom);

  const handleClose = () => {
    setToast({ show: false, message: "" });
  };

  if (!toast.show) return null;

  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={toast.message}
        onClose={handleClose}
        message={message}
        key={toast.key}
        autoHideDuration={config.toastDuration}
      />
    </Box>
  );
});

export default Toast;
