import React from 'react';

export default function index() {
	// This is obv just a placeholder
	console.log(process.env.PUBLIC_URL);
	console.log(process.env.REACT_APP_ORIGIN);

	return (
		<div>
			<h1 className='center'>Homepage</h1>
		</div>
	);
}
