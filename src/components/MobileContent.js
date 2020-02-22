import React, { useState } from 'react';
import { Link } from '@reach/router';
import { services } from '../res/constants';
import ServiceContent from './ServiceContent';

export default function MobileContent(props) {
	const content = services[props.row][props.item].content;

	const NavLink = (props) => (
		<Link
			{...props}
			getProps={({ isCurrent }) => {
				// the object returned here is passed to the
				// anchor element's props
				return {
					style: {
						color: isCurrent ? 'red' : 'blue',
					},
				};
			}}
		/>
	);

	const Navbar = (props) => {
		return (
			<nav>
				{services.map((rows, index) =>
					rows.map((item, key) => (
						<NavLink to={`/mobile/${index}/${key}/${item.title}`}>{item.title}</NavLink>
					))
				)}
			</nav>
		);
	};

	return (
		<div>
			<Navbar />
			<ServiceContent device={'mobile'} content={content} />
		</div>
	);
}
