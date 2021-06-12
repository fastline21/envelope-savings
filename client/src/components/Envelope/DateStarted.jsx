import React from 'react';
import moment from 'moment';

const DateStarted = ({ dateStarted }) => {
	return (
		<p className='text-center'>
			<strong>Date Started</strong>
			<br />
			{dateStarted ? moment(dateStarted).format('MMMM DD, YYYY') : 'None'}
		</p>
	);
};

export default DateStarted;
