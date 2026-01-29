import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
} from "@mui/material";

const DeleteConfirmationModal = ({ open, onClose, onConfirm }) => {
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Confirm Delete</DialogTitle>
			<DialogContent>
				<Typography>Are you sure you want to delete this item?</Typography>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color="primary">
					No
				</Button>
				<Button onClick={onConfirm} color="secondary">
					Yes
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DeleteConfirmationModal;
