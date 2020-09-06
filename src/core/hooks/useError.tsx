import { useState, useCallback } from 'react';
import validateEmail from 'helper/validateEmail';

export const useError = () => {
	const [error, setError] = useState(false);

	const getRequiredText = useCallback((fieldValue: string, type?: string) => {
		if (!fieldValue) {
			return 'This field is required';
		}

		switch (type) {
			case 'email':
				return 'Wrong email address!';
			default:
				return null;
		}
	}, []);

	const showError = useCallback(
		(fieldValue: string, type?: string) => {
			if (!error) {
				return null;
			}

			switch (type) {
				case 'email':
					return !validateEmail(fieldValue)
						? getRequiredText(fieldValue, type)
						: null;
				default:
					return getRequiredText(fieldValue, type);
			}
		},
		[getRequiredText, error]
	);

	return {
		showError,
		setError,
	};
};

export default useError;
