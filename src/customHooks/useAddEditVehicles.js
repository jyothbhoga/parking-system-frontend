import { useSetAtom } from "jotai";
import { useCallback } from "react";
import { makeAPICall } from "../common/axios/apiCalls";
import config from "../common/config";
import { toastStateAtom } from "../jotai/commonAtom";
import {
	currVehicleDataAtom,
	errorAtom,
	loadingAtom,
	vehicleDataAtom,
} from "../jotai/vehiclesAtom";

export const useAddEditVehicles = () => {
	const setVehicleData = useSetAtom(vehicleDataAtom);
	const setCurrVehicleData = useSetAtom(currVehicleDataAtom);
	const setLoading = useSetAtom(loadingAtom);
	const setError = useSetAtom(errorAtom);
	const setToast = useSetAtom(toastStateAtom);

	const fetchVehicles = useCallback(
		async (page, limit) => {
			setLoading(true);
			try {
				const response = await makeAPICall(
					`${config.API_BASE_DOMAIN}${config.API_BASE_URL}${config.API_VEHICLE_URL}?page=${page}&limit=${limit}`,
				);
				if (response.status === 200) {
					setVehicleData({
						data: response.data.vehicles,
						totalCount: response.data.totalCount,
						totalPages: response.data.totalPages,
					});
				} else {
					setToast({
						key: "fetchVehiclesAPIError",
						show: true,
						message: response.response.statusText,
					});
				}
			} catch (error) {
				setError(error.data.message);
			} finally {
				setLoading(false);
			}
		},
		[setError, setLoading, setVehicleData, setToast],
	);

	const fetchVehicleById = useCallback(
		async (id) => {
			setLoading(true);
			try {
				const response = await makeAPICall(
					`${config.API_BASE_DOMAIN}${config.API_BASE_URL}${config.API_VEHICLE_URL}/${id}`,
				);
				if (response.status === 200) {
					setCurrVehicleData(response.data);
				} else {
					setToast({
						key: "fetchVehicleByIdAPIError",
						show: true,
						message: response.response.data.message,
					});
				}
				return response.data;
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		},
		[setCurrVehicleData, setError, setLoading, setToast],
	);

	const createVehicle = useCallback(
		async (newVehicleData) => {
			setLoading(true);
			try {
				const response = await makeAPICall(
					`${config.API_BASE_DOMAIN}${config.API_BASE_URL}${config.API_VEHICLE_URL}/create`,
					"POST",
					newVehicleData,
				);
				if (response.status === 201) {
					return response;
				} else {
					setToast({
						key: "createVehicleAPIError",
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
		},
		[setError, setLoading, setToast],
	);

	const updateVehicle = useCallback(
		async (id, updatedVehicleData) => {
			setLoading(true);
			try {
				const response = await makeAPICall(
					`${config.API_BASE_DOMAIN}${config.API_BASE_URL}${config.API_VEHICLE_URL}/update/${id}`,
					"POST",
					updatedVehicleData,
				);
				if (response.status === 200) {
					return response;
				} else {
					setToast({
						key: "updateVehicleAPIError",
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
		},
		[setError, setLoading, setToast],
	);

	const deleteVehicle = useCallback(
		async (id) => {
			setLoading(true);
			try {
				const response = await makeAPICall(
					`${config.API_BASE_DOMAIN}${config.API_BASE_URL}${config.API_VEHICLE_URL}/delete/${id}`,
					"POST",
				);
				if (response.status === 200) {
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
		},
		[setError, setLoading, setToast],
	);

	return {
		fetchVehicles,
		createVehicle,
		updateVehicle,
		fetchVehicleById,
		deleteVehicle,
	};
};
