import React, { Fragment } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { logoutUser } from './../../actions/userAction';

const Header = ({ userState: { user }, logoutUser }) => {
	return (
		<Fragment>
			<Navbar bg='light' expand='lg'>
				<Navbar.Brand href='/'>
					{process.env.REACT_APP_TITLE}
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='ml-auto'>
						{user ? (
							<Fragment>
								<Nav.Link as={NavLink} to='/'>
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
};

const mapStateToProps = (state) => ({
	userState: state.userState,
});

export default connect(mapStateToProps, { logoutUser })(Header);
