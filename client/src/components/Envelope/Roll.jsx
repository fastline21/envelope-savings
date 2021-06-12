import React from 'react';
import { Button } from 'react-bootstrap';

const Roll = ({ rollNumber }) => {
	// TODO: Prevent user to roll if already roll that day
	return (
		<Button
			variant='primary'
			size='lg'
			className='w-100 my-3'
			onClick={() => rollNumber()}
		>
			Roll
		</Button>
	);
};

export default Roll;
