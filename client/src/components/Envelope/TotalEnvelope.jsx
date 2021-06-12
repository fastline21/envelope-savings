import React from 'react';

const TotalEnvelope = ({ totalEnvelope }) => {
	return (
		<p className='text-center'>
			<strong>Total Envelope</strong>
			<br />
			{totalEnvelope.toLocaleString()}
		</p>
	);
};

export default TotalEnvelope;
