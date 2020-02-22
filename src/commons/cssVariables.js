import { device_types } from './../res/constants';

export const primary_color = '#64ffda';
export const primary_color_dark = '#1de9b6';

const [MOBILE, TABLET, DESKTOP] = [...device_types];

export function getFontSize(device, size) {
	switch (device) {
		case MOBILE:
			return size * 0.7;
		case TABLET:
			return size * 0.9;
		case DESKTOP:
		default:
			return size * 1;
	}
}

export function getPadding(device, size) {
	switch (device) {
		case MOBILE:
			return size * 0.5;
		case TABLET:
			return size * 0.6;
		case DESKTOP:
		default:
			return size * 1;
	}
}
