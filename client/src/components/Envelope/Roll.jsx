import React from 'react';
import { Button } from 'react-bootstrap';

const Roll = ({ isRolled, rollNumber }) => {
	return (
		<Button
			variant={isRolled ? 'secondary' : 'primary'}
			size='lg'
			className='w-100 my-3'
			disabled={isRolled}
			onClick={() => rollNumber()}
		>
			Roll
		</Button>
	);
};

export default Roll;
