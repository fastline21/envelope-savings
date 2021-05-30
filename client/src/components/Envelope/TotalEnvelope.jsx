import React, { Fragment } from 'react';

const TotalEnvelope = ({ totalEnvelope }) => {
	return (
		<Fragment>Total Envelope: {totalEnvelope.toLocaleString()}</Fragment>
	);
};

export default TotalEnvelope;
