import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import { device_types, services } from '../res/constants';
import { getFontSize } from '../commons/cssVariables';
import ServiceContent from './ServiceContent';

export default function Dash(props) {
	const [MOBILE, TABLET, DESKTOP] = [...device_types];
	const device = props.device;
	const [window_width, window_height] = [props.size.width, props.size.height];

	function getGridProperties(items) {
		const grid_properties = {
			display: 'grid',
		};
		switch (device) {
			case MOBILE:
				return {
					...grid_properties,
					gridTemplateColumns: `repeat(auto-fit, minmax(${window_width}px, 1fr))`,
					gridTemplateRows: `repeat(${items}, minmax(${window_height}px, 1fr))`,
				};
			case TABLET:
				return {
					...grid_properties,
					gridTemplateColumns: `repeat(auto-fill, minmax(1fr, 1fr))`,
					gridAutoFlow: 'column',
					gridTemplateRows: `repeat(1, minmax(${window_height / 2}px, 1fr))`,
				};
			case DESKTOP:
			default:
				return {
					...grid_properties,
					gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr))`,
					gridTemplateRows: `repeat(1, minmax(${window_height / 1.5}px, 1fr))`,
				};
		}
	}
	let styles = {
		dash: { flex: 1, overflowY: 'scroll', scrollbarWidth: 'none' },
		grid: {},
		gridItemImage: {
			width: '100%',
			height: '100%',
			backgroundSize: 'cover',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
			transition: 'all 0.5s',
		},
		gridItemTitle: {
			float: 'right',
			fontFamily: 'Almarai, sans-serif',
			fontWeight: 800,
			color: 'white',
			fontSize: `${getFontSize(device, 3)}rem`,
			textShadow: '0.1rem 0.1rem 0.3rem #212121',
			transition: 'all 0.5s',
		},
	};

	const ItemContent = (props) => {
		const [title, image] = [props.title, props.image];
		return (
			<div
				className='zoom-on-hover'
				style={{ ...styles.gridItemImage, backgroundImage: `url(${image})` }}>
				<span style={styles.gridItemTitle}>{title}</span>
			</div>
		);
	};

	const MobileItem = (props) => {
		const [title, image, content] = [props.title, props.image, props.content];
		const [isContentVisible, setContentVisible] = useState(false);
		const [blur, setBlur] = useState('0px');

		useEffect(() => {
			isContentVisible ? setBlur('5px') : setBlur('0px');
		}, [isContentVisible]);

		return !isContentVisible ? (
			<div
				className='zoom-on-hover'
				onClick={() => setContentVisible(true)}
				style={{ ...styles.gridItemImage, backgroundImage: `url(${image})` }}>
				<span style={styles.gridItemTitle}>{title}</span>{' '}
			</div>
		) : (
			<>
				<div
					className='zoom-on-hover'
					style={{
						...styles.gridItemImage,
						backgroundImage: `url(${image})`,
						filter: `blur(${blur})`,
					}}>
					<div
						style={{
							height: '100%',
							width: '100%',
							backgroundColor: 'rgba(255, 255, 255, 0.3)',
						}}></div>
				</div>
				<div onMouseLeave={() => setContentVisible(false)} style={{ position: 'relative' }}>
					<div style={{ height: '100vh', position: 'absolute', bottom: '2px' }}>
						<ServiceContent device={device} content={content} />{' '}
						<button style={{ zIndex: '200' }} onClick={() => setContentVisible(false)}>
							close
						</button>
					</div>
				</div>
			</>
		);
	};

	ItemContent.propTypes = {
		title: PropTypes.string,
		image: PropTypes.string,
	};

	return (
		<div style={styles.dash}>
			{services.map((rows, i) => (
				<div key={i} style={getGridProperties(rows.length)}>
					{rows.map((item, index) => (
						<div key={index} style={{ overflow: 'hidden', gridColumn: `span ${item.weight}` }}>
							{device === MOBILE ? (
								<MobileItem image={item.image} title={item.title} content={item.content} />
							) : (
								<Link to={`/${i}/${index}/${item.title}`}>
									<ItemContent image={item.image} title={item.title} />
								</Link>
							)}
						</div>
					))}
				</div>
			))}
		</div>
	);
}

Dash.propTypes = {
	device: PropTypes.string.isRequired,
	size: PropTypes.object.isRequired,
};
