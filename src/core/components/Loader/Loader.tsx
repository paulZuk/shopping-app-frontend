import React from 'react';
import {
	Backdrop,
	CircularProgress,
	createStyles,
	makeStyles,
} from '@material-ui/core';

export type LoaderProps = {
	loading: boolean;
	invisible?: boolean | undefined;
}

const useStyles = makeStyles(() =>
	createStyles({
		loader: {
			zIndex: 1,
		},
	})
);

const Loader = ({ loading, invisible }: LoaderProps) => {
	const classes = useStyles();
	return (
		<Backdrop
			invisible={invisible}
			className={classes.loader}
			open={loading}
		>
			<CircularProgress color="primary" />
		</Backdrop>
	);
};

export default Loader;
