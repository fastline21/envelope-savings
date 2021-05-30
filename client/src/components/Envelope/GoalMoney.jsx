import React, { Fragment } from 'react';

const GoalMoney = ({ goalMoney }) => {
	return <Fragment>Goal Money: {goalMoney.toLocaleString()}</Fragment>;
};

export default GoalMoney;
