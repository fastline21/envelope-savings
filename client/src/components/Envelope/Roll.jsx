import React from 'react';
import { Button } from 'react-bootstrap';

const Roll = ({ rollNumber }) => {
	return (
		<Button
			variant='primary'
			size='lg'
			className='w-100'
			onClick={() => rollNumber()}
		>
			Roll
		</Button>
	);
};

export default Roll;
