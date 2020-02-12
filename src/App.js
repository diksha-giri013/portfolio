import React from 'react';
import { Router } from '@reach/router';
//import logo from './logo.svg';
import './App.css';

import { useIsMobile, useLayout } from './commons/customHooks';
import Header from './components/Header';
import Dash from './components/Dash';

export default function App() {
	const display = useIsMobile();
	const size = display.size;
	const device = display.device;

	const layout = useLayout();

	const styles = {
		app: { ...layout, height: size.height },
	};

	/*const Home = (props) => {
		return (
			<div>
				<Header device={device} size={size} />
			</div>
		);
	};*/

	return (
		<div style={styles.app}>
			<Router>
				<Header path='/:row/:item/:data' device={device} size={size} />
				<Header path='/*' device={device} size={size} />
			</Router>
			<Dash device={device} size={size} />
		</div>
	);
}
