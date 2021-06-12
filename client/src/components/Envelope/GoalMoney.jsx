import React from 'react';

const GoalMoney = ({ goalMoney }) => {
	return (
		<p className='text-center'>
			<strong>Goal Money</strong>
			<br />
			{goalMoney.toLocaleString()}
		</p>
	);
};

export default GoalMoney;
