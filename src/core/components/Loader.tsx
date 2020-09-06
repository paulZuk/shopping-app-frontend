import React from 'react';
import {
	Backdrop,
	CircularProgress,
	createStyles,
	makeStyles,
} from '@material-ui/core';

interface ILoader {
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

const Loader = ({ loading, invisible }: ILoader) => {
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
