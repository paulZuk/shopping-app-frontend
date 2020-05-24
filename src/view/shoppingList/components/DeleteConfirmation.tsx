import React, { useState, useCallback, useEffect } from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	DialogContentText,
	Button,
} from '@material-ui/core';

interface IDeleteConfirmation {
	dialogVisible: boolean;
	setDialogVisible: (dialogVisible: boolean) => void;
	handleConfirm: () => void;
}

const DeleteConfirmation = ({
	dialogVisible,
	setDialogVisible,
	handleConfirm,
}: IDeleteConfirmation) => {
	const handleClose = useCallback(() => {
		setDialogVisible(false);
	}, [setDialogVisible]);

	return (
		<Dialog open={dialogVisible} onClose={handleClose}>
			<DialogTitle>{'Delete list'}</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Are you sure you want to delete list?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Disagree
				</Button>
				<Button onClick={handleConfirm} color="primary" autoFocus>
					Agree
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DeleteConfirmation;
