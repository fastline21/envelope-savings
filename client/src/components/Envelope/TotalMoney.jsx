import React from 'react';

const TotalMoney = ({ totalMoney }) => {
	return (
		<p className='text-center'>
			<strong>Total Money</strong>
			<br />
			{totalMoney.toLocaleString()}
		</p>
	);
};

export default TotalMoney;
