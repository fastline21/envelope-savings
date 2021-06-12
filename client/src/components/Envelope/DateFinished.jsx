import React from 'react';
import moment from 'moment';

const DateFinished = ({ dateFinished }) => {
	return (
		<p className='text-center'>
			<strong>Date Finished</strong>
			<br />
			{dateFinished
				? moment(dateFinished).format('MMMM DD, YYYY')
				: 'None'}
		</p>
	);
};

export default DateFinished;
