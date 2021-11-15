import React, { useState } from 'react';
import { Typography } from '@material-ui/core';

export default function Welcome() {
	const [data, setData] = useState();

	return (
		<div>
			<div className="container">
				<h1>Welcome to KHub</h1>
				<p style={{fontSize: 20}} >One stop solution for all your resource requirements.</p>
			</div>
		</div>
	)
}