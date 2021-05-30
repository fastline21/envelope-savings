import React, { Fragment } from 'react';

const TotalMoney = ({ totalMoney }) => {
	return <Fragment>Total Money: {totalMoney.toLocaleString()}</Fragment>;
};

export default TotalMoney;
