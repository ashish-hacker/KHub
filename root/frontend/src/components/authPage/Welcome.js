import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';

export default function Welcome() {
	const [data, setData] = useState();

	return (
		<div>
			<Navbar id="3" />
			<div className="container">
				<h1>Welcome.</h1>
			</div>
		</div>
	)
}