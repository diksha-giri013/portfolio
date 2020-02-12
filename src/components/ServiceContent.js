import React from 'react';
import {
	getFontSize,
	getPadding,
	primary_color_dark,
	primary_color,
} from './../commons/cssVariables';

export default function ServiceContent(props) {
	const [content, device] = [props.content, props.device];

	const styles = {
		content: {
			padding: `${getPadding(device, 4)}rem`,
		},
		title: {
			fontFamily: 'Quicksand, sans-serif',
			fontSize: '2rem',
			fontWeight: '500',
		},
		titleHighlight: {
			borderBottom: `0.3rem solid ${primary_color_dark}`,
		},
		example: {
			fontFamily: 'Darker Grotesque, sans-serif',
			textTransform: 'uppercase',
		},
		description: {
			fontFamily: 'Darker Grotesque, sans-serif',
			fontSize: '1.6rem',
			fontWeight: '400',
			lineHeight: '2.3rem',
			textAlign: 'justify',
		},
		cta: {
			width: 'max-content',
			padding: '1rem',
			outline: 'none',
			border: 'none',
			fontSize: '1rem',
			backgroundColor: `${primary_color}`,
			cursor: 'pointer',
		},
	};

	return (
		<div style={styles.content}>
			<h3 style={styles.title}>
				{content.headerStart} <span style={styles.titleHighlight}>{content.header}</span>{' '}
				{content.headerDesc}
			</h3>
			<p style={styles.example}>{content.ex}</p>
			<p style={styles.description}>{content.desc}</p>
			<button className='hover-shadow' style={styles.cta}>
				{content.button}
			</button>
		</div>
	);
}
