import React from 'react';
import PropTypes from 'prop-types';
import { device_types, services } from './../res/constants';
//import { primary_color, primary_color_dark, getPadding } from './../commons/cssVariables';
import ServiceContent from './ServiceContent';

export default function Header(props) {
	const [MOBILE, TABLET, DESKTOP] = [...device_types];
	const device = props.device;
	const [window_width, window_height] = [props.size.width, props.size.height];
	const home = {
		headerStart: 'Hi there! We can offer you',
		header: 'solutions for branding and tech',
		headerDesc: 'to Boost your Business.',
		desc: 'Click on any of the services we offer to know more!',
		ex: '',
		button: "Let's Talk",
	};
	const content =
		props.row && props.item === 'false' ? home : services[props.row][props.item].content;

	function getDimensions() {
		switch (device) {
			case MOBILE:
				return ['100%', window_height];
			case TABLET:
				return [window_width / 3, '100%'];
			case DESKTOP:
				return [window_width / 4, '100%'];
			default:
		}
	}

	const [width, height] = getDimensions();
	const styles = {
		header: {
			width: width,
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			backgroundColor: '#fafafa',
			height: height,
			zIndex: '200',
			boxShadow: '0.3rem 0.3rem 1rem gray',
		},
	};

	return (
		<div style={styles.header}>
			<h1 className='logo-font'>ChipMonk Studios</h1>
			<ServiceContent device={device} content={content} />
		</div>
	);
}

Header.propTypes = {
	row: PropTypes.string,
	item: PropTypes.string,
};

Header.defaultProps = { row: 'false', item: 'false' };
