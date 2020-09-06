import { useState, useLayoutEffect } from 'react';

const useWindowSize = () => {
	let [size, setSize] = useState({
		windowWidth: window.innerWidth,
		windowHeight: window.innerHeight,
	});
	useLayoutEffect(() => {
		const updateSize = () => {
			setSize({
				windowWidth: window.innerWidth,
				windowHeight: window.innerHeight,
			});
		};
		let resizeHandler = updateSize;

		window.addEventListener('resize', resizeHandler);
		updateSize();
		return () => window.removeEventListener('resize', resizeHandler);
	}, []);
	return size;
};

export default useWindowSize;
