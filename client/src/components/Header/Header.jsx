import React, { Fragment, useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { logoutUser, loadUser } from 'actions/userAction';

import PreLoader from 'components/PreLoader';

const Header = ({ userState: { user, loading }, logoutUser, loadUser }) => {
	const location = useLocation();

	const [isLoading, setIsLoading] = useState(null);
	const [navExpanded, setNavExpanded] = useState(false);

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

	useEffect(() => {
		setNavExpanded(false);

		// eslint-disable-next-line
	}, [location]);

	if (isLoading) {
		return <PreLoader />;
	}

	return (
		<Navbar
			bg='dark'
			variant='dark'
			expand='lg'
			onToggle={setNavExpanded}
			expanded={navExpanded}
		>
			<Container>
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
			</Container>
		</Navbar>
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
