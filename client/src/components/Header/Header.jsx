import React, { Fragment } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Header = () => {
	return (
		<Fragment>
			<Navbar bg='light' expand='lg'>
				<Navbar.Brand href='/'>
					{process.env.REACT_APP_TITLE}
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='ml-auto'>
						<Nav.Link exact as={NavLink} to='/'>
							Home
						</Nav.Link>
						<Nav.Link as={NavLink} to='/about'>
							About
						</Nav.Link>
						{/* <Nav.Link as={NavLink} to='/dashboard'>
							Dashboard
						</Nav.Link> */}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</Fragment>
	);
};

export default Header;
