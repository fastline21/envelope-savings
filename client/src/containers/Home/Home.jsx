import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Home = () => {
	return (
		<Container className='text-center'>
			<h1>Home</h1>
			<Button variant='primary' as={NavLink} to='/login'>
				Login
			</Button>
			&nbsp;
			<Button variant='primary' as={NavLink} to='/register'>
				Register
			</Button>
		</Container>
	);
};

export default Home;
