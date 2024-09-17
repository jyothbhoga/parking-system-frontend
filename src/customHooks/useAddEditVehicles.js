import { useSetAtom } from "jotai";
import { makeAPICall } from "../common/axios/apiCalls";
import {
  currVehicleDataAtom,
  errorAtom,
  loadingAtom,
  vehicleDataAtom,
} from "../jotai/vehiclesAtom";
import config from "../common/config";
import { toastStateAtom } from "../jotai/commonAtom";

export const useAddEditVehicles = () => {
  const setVehicleData = useSetAtom(vehicleDataAtom);
  const setCurrVehicleData = useSetAtom(currVehicleDataAtom);
  const setLoading = useSetAtom(loadingAtom);
  const setError = useSetAtom(errorAtom);
  const setToast = useSetAtom(toastStateAtom);

  const fetchVehicles = async (page, limit) => {
    setLoading(true);
    try {
      const response = await makeAPICall(
        `${config.API_BASE_DOMAIN}${config.API_BASE_URL}${config.API_VEHICLE_URL}?page=${page}&limit=${limit}`
      );
      if (response.data.isSuccess === true) {
        setVehicleData({
          data: response.data.data.vehicles,
          totalCount: response.data.data.totalCount,
          totalPages: response.data.data.totalPages,
        });
      } else {
        setToast({
          key: "fetchVehiclesAPIError",
          show: true,
          message: response.data.error.errorDescription,
        });
      }
    } catch (error) {
      setError(error.data.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchVehicleById = async (id) => {
    setLoading(true);
    try {
      const response = await makeAPICall(
        `${config.API_BASE_DOMAIN}${config.API_BASE_URL}${config.API_VEHICLE_URL}/${id}`
      );
      if (response.data.isSuccess === true) {
        setCurrVehicleData(response.data);
      } else {
        setToast({
          key: "fetchVehicleByIdAPIError",
          show: true,
          message: response.response.data.data.message,
        });
      }
      return response.data.data;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createVehicle = async (newVehicleData) => {
    setLoading(true);
    try {
      const response = await makeAPICall(
        `${config.API_BASE_DOMAIN}${config.API_BASE_URL}${config.API_VEHICLE_URL}/create`,
        "POST",
        newVehicleData
      );
      if (response.data.isSuccess === true) {
        return response;
      } else {
        setToast({
          key: "createVehicleAPIError",
          show: true,
          message: response.response.data.data.message,
        });
        return response;
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateVehicle = async (id, updatedVehicleData) => {
    setLoading(true);
    try {
      const response = await makeAPICall(
        `${config.API_BASE_DOMAIN}${config.API_BASE_URL}${config.API_VEHICLE_URL}/update/${id}`,
        "POST",
        updatedVehicleData
      );
      if (response.data.isSuccess === true) {
        return response;
      } else {
        setToast({
          key: "updateVehicleAPIError",
          show: true,
          message: response.response.data.data.message,
        });
        return response;
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteVehicle = async (id) => {
    setLoading(true);
    try {
      const response = await makeAPICall(
        `${config.API_BASE_DOMAIN}${config.API_BASE_URL}${config.API_VEHICLE_URL}/delete/${id}`,
        "POST"
      );
      if (response.data.isSuccess === true) {
        return response;
      } else {
        setToast({
          key: "deleteVehicleAPIError",
          show: true,
          message: response.response.data.message,
        });
        return response;
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchVehicles,
    createVehicle,
    updateVehicle,
    fetchVehicleById,
    deleteVehicle,
  };
};
