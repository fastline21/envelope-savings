import React from 'react';

const TotalMoney = ({ totalMoney }) => {
	return (
		<p className='text-center'>
			<strong>Total Money</strong>
			<br />
			{totalMoney.toLocaleString(undefined, { minimumFractionDigits: 2 })}
		</p>
	);
};

export default TotalMoney;
