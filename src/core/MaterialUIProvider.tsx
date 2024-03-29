import React, { PropsWithChildren } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { createTheme, ThemeOptions } from '@material-ui/core';

const muiThemeOptions: ThemeOptions = {
	palette: {
		primary: {
			main: 'rgb(25,150,252)',
		},
		secondary: {
			main: 'rgb(255,255,255)',
		},
	},
	typography: {
		button: {
			fontWeight: 'bold',
		},
		fontFamily: 'arial',
	},
	overrides: {
		MuiChip: {
			root: {
				backgroundColor: 'white',
			},
			label: {
				color: 'rgba(25, 150, 252, 1)',
			},
			deleteIcon: {
				color: 'rgba(25, 150, 252, 1)',
			},
		},
		MuiLinearProgress: {
			root: {
				borderRadius: '2px',
			},
		},
		MuiFormLabel: {
			root: {
				color: 'white',
				'&.Mui-focused': {
					color: 'white',
				},
			},
		},
		MuiInputBase: {
			input: {
				color: 'white',
			},
		},
		MuiSwitch: {
			switchBase: {
				color: 'rgba(25, 150, 252, 1)',
			},
			track: {
				backgroundColor: 'white',
			},
		},
		MuiSvgIcon: {
			root: {
				fill: 'white',
			},
		},
		MuiOutlinedInput: {
			root: {
				'&:hover .MuiOutlinedInput-notchedOutline': {
					borderColor: 'rgba(25, 150, 252, 1)',
				},
			},
			notchedOutline: {
				borderColor: 'rgba(25, 150, 252, 0.5)',
			},
		},
		MuiAccordion: {
			root: {
				backgroundColor: 'rgb(100, 239, 255)',
			},
			rounded: {
				'&:first-child': {
					borderTopLeftRadius: 0,
					borderTopRightRadius: 0,
				},
				'&:last-child': {
					borderBottomLeftRadius: 0,
					borderBottomRightRadius: 0,
				},
			},
		},
		MuiAccordionSummary: {
			root: {
				color: 'white',
				backgroundColor: 'rgba(0, 228, 255, 1)',
				borderBottom: '1px solid rgba(25, 150, 252, 0.5)',
			},
		},
		MuiPaper: {
			elevation1: {
				boxShadow: 'unset',
			},
		},
		MuiCheckbox: {
			root: {
				color: 'white',
			},
		},
	},
};

const muiTheme = createTheme(muiThemeOptions);

const MaterialUiProvider = ({ children }: PropsWithChildren<unknown>) => (
	<MuiThemeProvider theme={muiTheme}>
		{React.Children.toArray(children)}
	</MuiThemeProvider>
);

export default MaterialUiProvider;
