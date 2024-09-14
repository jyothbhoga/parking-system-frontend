import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import config from "../../common/config";
import { makeAPICall } from "../../common/axios/apiCalls";
import { setCookie } from "../../common/helper";

const LoginModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const url = `${config.API_BASE_DOMAIN}${config.API_BASE_URL}${config.API_ADMIN_URL}/login`;
    const data = await makeAPICall(
      url,
      "POST",
      { email: email, password: password },
      false
    );
    setCookie("token", `Bearer ${data.token}`);
    window.location.reload();
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogin} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LoginModal;
