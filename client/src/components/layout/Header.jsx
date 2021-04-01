import React, { Fragment } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Actions
import { logoutUser } from "./../../actions/userAction";

const Header = ({ userState: { isAuthenticated }, logoutUser }) => {
	return (
		<Navbar bg="light" expand="lg">
			<Navbar.Brand as={NavLink} exact to="/">
				Envelope Savings
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="ml-auto">
					<Nav.Link as={NavLink} exact to="/">
						Home
					</Nav.Link>
					{isAuthenticated ? (
						<Fragment>
							<Nav.Link as={NavLink} to="/dashboard">
								Dashboard
							</Nav.Link>
							<Nav.Link
								as={NavLink}
								to="/login"
								onClick={() => logoutUser()}
							>
								Logout
							</Nav.Link>
						</Fragment>
					) : (
						<Fragment>
							<Nav.Link as={NavLink} to="/login">
								Login
							</Nav.Link>
							<Nav.Link as={NavLink} to="/register">
								Register
							</Nav.Link>
						</Fragment>
					)}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
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
