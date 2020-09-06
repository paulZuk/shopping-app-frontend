import React, { useRef, useCallback } from 'react';
import { Box, makeStyles, createStyles } from '@material-ui/core';
import Navbar from './navbar/Navbar';
import useWindowSize from '../hooks/useWindowSize';

interface IPropsStyles {
	childView: boolean | undefined;
}

const useStyles = makeStyles(() =>
	createStyles({
		root: {
			background: ({ childView }: IPropsStyles) =>
				childView
					? 'linear-gradient(180deg, rgba(0,228,255,1) 0%, rgba(255,255,255,1) 100%)'
					: 'rgba(0, 228, 255, 1)',
			position: 'relative',
			overflow: 'auto',
		},
	})
);

interface ILayout extends React.Props<{}> {
	childView?: boolean;
	onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
	path?: string;
	detailListName?: string;
}

const Layout = ({
	children,
	childView,
	onScroll,
	path,
	detailListName,
}: ILayout) => {
	const { windowHeight } = useWindowSize();
	const appBarRef = useRef<HTMLDivElement>(null);
	const classes = useStyles({ childView });

	const setContentHeight = useCallback(() => {
		if (!appBarRef.current) return;
		return windowHeight - appBarRef.current.offsetHeight;
	}, [windowHeight]);

	return (
		<Box>
			<Navbar
				appBarRef={appBarRef}
				detailListName={detailListName}
				path={path}
				childView={childView}
			/>
			<Box
				onScroll={onScroll}
				className={classes.root}
				height={setContentHeight()}
			>
				{React.Children.toArray(children)}
			</Box>
		</Box>
	);
};

export default Layout;
