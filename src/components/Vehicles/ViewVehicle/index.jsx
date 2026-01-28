import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAddEditVehicles } from "../../../customHooks/useAddEditVehicles";
import {
	currVehicleDataAtom,
	vehicleDataAtom,
} from "../../../jotai/vehiclesAtom";

const ViewVehicle = () => {
	const location = useLocation();
	const vehicleId = location.pathname.split("/")[3];
	const vehicleData = useAtomValue(vehicleDataAtom);
	const { fetchVehicleById } = useAddEditVehicles();
	const [currVehicle, setCurrentVehicle] = useAtom(currVehicleDataAtom);

	useEffect(() => {
		if (vehicleData?.data?.length) {
			const vehicle = vehicleData?.data.find((veh) => veh._id === vehicleId);
			setCurrentVehicle(vehicle);
		} else {
			fetchVehicleById(vehicleId);
		}
	}, [vehicleData, vehicleId, setCurrentVehicle, fetchVehicleById]);

	return (
		<Box sx={{ maxWidth: 400, margin: "0 auto", padding: 2 }}>
			<Typography variant="h5" component="h2" gutterBottom>
				Vehicle Details
			</Typography>
			{currVehicle ? (
				<List>
					<ListItem>
						<ListItemText primary="Vehicle Name" secondary={currVehicle.name} />
					</ListItem>
					<ListItem>
						<ListItemText
							primary="Owner Name"
							secondary={currVehicle.ownerName}
						/>
					</ListItem>
					<ListItem>
						<ListItemText
							primary="Registration Nuumber"
							secondary={currVehicle.regNo}
						/>
					</ListItem>
					<ListItem>
						<ListItemText primary="Vehicle Type" secondary={currVehicle.type} />
					</ListItem>
					<ListItem>
						<ListItemText primary="Room No" secondary={currVehicle.roomNo} />
					</ListItem>
					<ListItem>
						<ListItemText
							primary="Building Name"
							secondary={currVehicle.bldgName}
						/>
					</ListItem>
					{currVehicle.stickerImgURL && (
						<ListItem>
							<ListItemText
								primary="Vehicle Image"
								secondary={currVehicle.name}
							/>
							<img
								src={`${currVehicle.stickerImgURL}?v=${Date.now()}`}
								alt={currVehicle.name}
								width={"100%"}
							/>
						</ListItem>
					)}
				</List>
			) : (
				<Typography>No data available</Typography>
			)}
		</Box>
	);
};

export default ViewVehicle;
