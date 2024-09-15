import axios from "axios";
import { getCookie } from "../helper";

// Common API function
export const makeAPICall = async (
  url,
  method = "GET",
  data = null,
  isLoggedIn = true
) => {
  try {
    const config = {
      method,
      url,
      headers: {
        "Content-Type": url.includes("login")
          ? "application/json"
          : "multipart/form-data",
        Authorization: isLoggedIn ? getCookie("token") : "",
      },
    };
    if (data) config.data = data;
    const response = await axios(config);
    return response;
  } catch (error) {
    return error;
  }
};
