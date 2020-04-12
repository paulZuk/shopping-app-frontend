import React, { useRef, useCallback } from 'react';
import { Box, makeStyles, createStyles, Theme } from '@material-ui/core';
import Navbar from './navbar/Navbar';
import useWindowSize from '../hooks/useWindowSize';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			background:
				'linear-gradient(180deg, rgba(0,228,255,1) 0%, rgba(255,255,255,1) 100%)',
		},
	})
);

const Layout = () => {
	const { windowHeight } = useWindowSize();
	const appBarRef = useRef<HTMLDivElement>(null);
	const classes = useStyles();

	const setContentHeight = useCallback(() => {
		if (!appBarRef.current) return;
		return windowHeight - appBarRef.current.offsetHeight;
	}, [windowHeight]);

	return (
		<>
			<Navbar appBarRef={appBarRef} />
			<Box className={classes.root} height={setContentHeight()}></Box>
		</>
	);
};

export default Layout;
