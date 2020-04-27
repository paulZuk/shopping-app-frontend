import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme, {
	ThemeOptions,
} from '@material-ui/core/styles/createMuiTheme';

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
	},
};

const muiTheme = createMuiTheme(muiThemeOptions);

interface IMaterialUiProviderProps extends React.Props<{}> {}

const MaterialUiProvider = ({ children }: IMaterialUiProviderProps) => (
	<MuiThemeProvider theme={muiTheme}>
		{React.Children.toArray(children)}
	</MuiThemeProvider>
);

export default MaterialUiProvider;
