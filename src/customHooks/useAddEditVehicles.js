import { useSetAtom } from "jotai";
import { makeAPICall } from "../common/axios/apiCalls";
import {
  currVehicleDataAtom,
  errorAtom,
  loadingAtom,
  vehicleDataAtom,
} from "../jotai/vehiclesAtom";
import config from "../common/config";

export const useAddEditVehicles = () => {
  const setVehicleData = useSetAtom(vehicleDataAtom);
  const setCurrVehicleData = useSetAtom(currVehicleDataAtom);
  const setLoading = useSetAtom(loadingAtom);
  const setError = useSetAtom(errorAtom);

  const fetchVehicles = async (page, limit) => {
    setLoading(true);
    try {
      const data = await makeAPICall(
        `${config.API_BASE_DOMAIN}${config.API_BASE_URL}${config.API_VEHICLE_URL}?page=${page}&limit=${limit}`
      );
      setVehicleData({
        data: data.vehicles,
        totalCount: data.totalCount,
        totalPages: data.totalPages,
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchVehicleById = async (id) => {
    setLoading(true);
    try {
      const data = await makeAPICall(
        `${config.API_BASE_DOMAIN}${config.API_BASE_URL}${config.API_VEHICLE_URL}/${id}`
      );
      setCurrVehicleData(data);
      return data;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createVehicle = async (newVehicleData) => {
    setLoading(true);
    try {
      const data = await makeAPICall(
        `${config.API_BASE_DOMAIN}${config.API_BASE_URL}${config.API_VEHICLE_URL}/create`,
        "POST",
        newVehicleData
      );
      return data;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateVehicle = async (id, updatedVehicleData) => {
    setLoading(true);
    try {
      const data = await makeAPICall(
        `${config.API_BASE_DOMAIN}${config.API_BASE_URL}${config.API_VEHICLE_URL}/update/${id}`,
        "POST",
        updatedVehicleData
      );
      return data;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { fetchVehicles, createVehicle, updateVehicle, fetchVehicleById };
};
