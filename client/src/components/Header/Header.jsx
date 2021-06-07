import React, { Fragment, useEffect, useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { logoutUser, loadUser } from 'actions/userAction';

import PreLoader from 'components/PreLoader';

const Header = ({ userState: { user, loading }, logoutUser, loadUser }) => {
	const [isLoading, setIsLoading] = useState(null);

	if (localStorage.token && isLoading === null && !user) {
		setIsLoading(true);
	}

	useEffect(() => {
		if (isLoading) {
			loadUser();
		}

		// eslint-disable-next-line
	}, [isLoading]);

	useEffect(() => {
		if (isLoading && !loading) {
			setInterval(() => {
				setIsLoading(false);
			}, 730);
		}

		// eslint-disable-next-line
	}, [loading]);

	if (isLoading) {
		return <PreLoader />;
	}

	return (
		<Fragment>
<<<<<<< HEAD
			<Navbar bg='dark' variant='dark' expand='lg'>
=======
			<Navbar bg='dark' variant='dark'>
>>>>>>> develop
				<Navbar.Brand href='/'>
					{process.env.REACT_APP_TITLE}
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='ml-auto'>
						{user ? (
							<Fragment>
								<Nav.Link exact as={NavLink} to='/dashboard'>
									Dashboard
								</Nav.Link>
								<Nav.Link
									as={NavLink}
									to='/login'
									onClick={() => logoutUser()}
								>
									Logout
								</Nav.Link>
							</Fragment>
						) : (
							<Fragment>
								<Nav.Link exact as={NavLink} to='/'>
									Home
								</Nav.Link>
								<Nav.Link as={NavLink} to='/about'>
									About
								</Nav.Link>
							</Fragment>
						)}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</Fragment>
	);
};

Header.propTypes = {
	userState: PropTypes.object.isRequired,
	logoutUser: PropTypes.func.isRequired,
	loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	userState: state.userState,
});

export default connect(mapStateToProps, { logoutUser, loadUser })(Header);
