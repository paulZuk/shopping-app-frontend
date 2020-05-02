import React, { useRef, useCallback } from 'react';
import { Box, makeStyles, createStyles, Theme } from '@material-ui/core';
import Navbar from './navbar/Navbar';
import useWindowSize from '../hooks/useWindowSize';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			// background:
			// 	'linear-gradient(180deg, rgba(0,228,255,1) 0%, rgba(255,255,255,1) 100%)',
			position: 'relative',
			backgroundColor: 'rgba(0, 228, 255, 0.5)',
		},
	})
);

interface ILayout extends React.Props<{}> {}

const Layout = ({ children }: ILayout) => {
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
			<Box className={classes.root} height={setContentHeight()}>
				{React.Children.toArray(children)}
			</Box>
		</>
	);
};

export default Layout;
