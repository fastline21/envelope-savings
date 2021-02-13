import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Header = () => {
	return (
		<Navbar bg='light' expand='lg'>
			<Navbar.Brand as={NavLink} exact to='/'>
				Envelope Savings
			</Navbar.Brand>
			<Navbar.Toggle aria-controls='basic-navbar-nav' />
			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav className='ml-auto'>
					<Nav.Link as={NavLink} exact to='/'>
						Home
					</Nav.Link>
					<Nav.Link as={NavLink} to='/login'>
						Login
					</Nav.Link>
					<Nav.Link as={NavLink} to='/register'>
						Register
					</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default Header;
