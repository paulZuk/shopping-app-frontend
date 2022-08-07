import React, { useRef, useCallback, PropsWithChildren } from 'react';
import { Box, makeStyles, createStyles } from '@material-ui/core';
import Navbar from './Navbar';
import useWindowSize from '../hooks/useWindowSize';

export type LayoutProps = {
	childView?: boolean;
	onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
	path?: string;
	detailListName?: string;
};

const useStyles = makeStyles(() =>
	createStyles({
		root: {
			background: ({ childView }: LayoutProps) =>
				childView
					? 'linear-gradient(180deg, rgba(0,228,255,1) 0%, rgba(255,255,255,1) 100%)'
					: 'rgba(0, 228, 255, 1)',
			position: 'relative',
			overflow: 'hidden',
		},
	})
);

const Layout = ({
	children,
	childView,
	onScroll,
	path,
	detailListName,
}: PropsWithChildren<LayoutProps>) => {
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
