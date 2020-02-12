// Hook
import { useEffect, useState } from 'react';
import { device_types } from '../res/constants';

const [MOBILE, TABLET, DESKTOP] = [...device_types];

export function useWindowSize() {
	const isClient = typeof window === 'object';

	function getSize() {
		return {
			width: isClient ? window.innerWidth : undefined,

			height: isClient ? window.innerHeight : undefined,
		};
	}

	const [windowSize, setWindowSize] = useState(getSize);

	useEffect(() => {
		if (!isClient) {
			return false;
		}

		function handleResize() {
			setWindowSize(getSize());
		}

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); // Empty array ensures that effect is only run on mount and unmount

	return windowSize;
}

export function useIsMobile() {
	function getDevice(width) {
		if (width <= 600) return MOBILE;
		else if (width <= 1025) return TABLET;
		else return DESKTOP;
	}

	const windowsize = useWindowSize();
	const [device, setDevice] = useState(() => getDevice(windowsize.width));

	useEffect(() => {
		setDevice(getDevice(windowsize.width));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [windowsize.width]); // Empty array ensures that effect is only run on mount and unmount

	return { size: windowsize, device: device };
}

export function useLayout() {
	function getLayout(device) {
		switch (device) {
			case MOBILE:
				return { display: 'block' };
			case TABLET:
			case DESKTOP:
				return { display: 'flex' };
			default:
				return { display: 'flex' };
		}
	}
	const device = useIsMobile().device;
	const [layout, setLayout] = useState(() => getLayout(device));

	useEffect(() => {
		setLayout(getLayout(device));
	}, [device]);
	return layout;
}

export default useIsMobile;
