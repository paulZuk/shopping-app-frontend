import React from 'react';
import {
	Backdrop,
	CircularProgress,
	createStyles,
	makeStyles,
} from '@material-ui/core';

interface ILoader {
	loading: boolean;
}

const useStyles = makeStyles(() =>
	createStyles({
		loader: {
			zIndex: 1,
		},
	})
);

const Loader = ({ loading }: ILoader) => {
	const classes = useStyles();
	return (
		<Backdrop className={classes.loader} open={loading}>
			<CircularProgress color="primary" />
		</Backdrop>
	);
};

export default Loader;
