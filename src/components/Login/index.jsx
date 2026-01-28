import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import config from "../../common/config";
import { makeAPICall } from "../../common/axios/apiCalls";
import {
  setCookie,
  validateEmail,
  validatePassword,
} from "../../common/helper";
import { useSetAtom } from "jotai";
import { toastStateAtom } from "../../jotai/commonAtom";

const LoginModal = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isValidated, setValidation] = useState(false);
  const [isErr, setErr] = useState();
  const setToast = useSetAtom(toastStateAtom);

  useEffect(() => {
    const validated =
      validateEmail(formData.email) && validatePassword(formData.password);
    setValidation(validated);
  }, [formData]);

  const handleLogin = async () => {
    const url = `${config.API_BASE_DOMAIN}${config.API_BASE_URL}${config.API_ADMIN_URL}/login`;
    const data = await makeAPICall(
      url,
      "POST",
      { email: formData.email, password: formData.password },
      false
    );
    if (data.status === 200) {
      setCookie("token", `Bearer ${data.data.token}`, {
        expires: new Date(Date.now() + config.expirationTime),
      });
      window.location.reload();
    } else {
      if (data.status === 401) {
        setErr(data.response.data.message);
      } else {
        setToast({
          key: "loginAPIError",
          show: true,
          message: data.response.data.message,
        });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <Dialog
        open={true}
        aria-labelledby="login-dialog-title"
        aria-describedby="login-dialog-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="login-dialog-title">Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            name="password"
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </DialogContent>
        {isErr && (
          <Alert
            severity="error"
            color="warning"
            sx={{
              textAlign: "center",
              width: "80%",
              margin: "0 auto",
              background: "none",
            }}
          >
            {isErr}
          </Alert>
        )}
        <DialogActions>
          <Button
            onClick={handleLogin}
            variant="contained"
            color="primary"
            sx={{ color: "#fff" }}
            disabled={!isValidated}
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LoginModal;
