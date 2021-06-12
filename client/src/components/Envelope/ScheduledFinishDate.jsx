import React from 'react';
import moment from 'moment';

const ScheduledFinishDate = ({ scheduledFinishDate }) => {
	return (
		<p className='text-center'>
			<strong>Scheduled Finish Date</strong>
			<br />
			{scheduledFinishDate
				? moment(scheduledFinishDate).format('MMMM DD, YYYY')
				: 'None'}
		</p>
	);
};

export default ScheduledFinishDate;
