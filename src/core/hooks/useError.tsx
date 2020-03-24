import { useState, useCallback } from 'react';

export const useError = () => {
	const [error, setError] = useState(false);

	const showError = useCallback(
		(fieldValue: string) => {
			return error && !fieldValue;
		},
		[error]
	);

	const getRequiredText = useCallback(
		(fieldValue: string, reqAlert?: string) => {
			const alert = reqAlert || 'This field is required';
			return showError(fieldValue) ? alert : null;
		},
		[showError]
	);

	return {
		showError,
		getRequiredText,
		setError,
	};
};

export default useError;
