import React from 'react';
import { Button } from 'react-bootstrap';

const Roll = ({ isRolled, isCompleted, rollNumber }) => {
	return (
		<Button
			variant={isRolled || isCompleted ? 'secondary' : 'primary'}
			size='lg'
			className='w-100 my-3'
			disabled={isRolled || isCompleted}
			onClick={() => rollNumber()}
		>
			Roll
		</Button>
	);
};

export default Roll;
