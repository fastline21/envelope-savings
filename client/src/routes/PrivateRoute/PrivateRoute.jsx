import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { loadUser } from 'actions/userAction';

// Components
import PreLoader from 'components/PreLoader';

const PrivateRoute = ({
	loadUser,
	userState: { user, loading },
	component: Component,
	...rest
}) => {
	const [isLoading, setIsLoading] = useState(null);

	if (localStorage.token && isLoading === null) {
		setIsLoading(true);
	}

	// 1st run
	useEffect(() => {
		if (isLoading) {
			return loadUser();
		}

		// eslint-disable-next-line
	}, [isLoading]);

	// 2nd run
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
		<Route
			{...rest}
			render={
				(props) =>
					user ? <Component {...props} /> : <Redirect to='/login' />

				// TODO: Check this code for feature version
				// user ? (
				// 	Component.name === 'Home' ? (
				// 		<Dashboard />
				// 	) : (
				// 		<Component {...props} />
				// 	)
				// ) : Component.name === 'Home' ? (
				// 	<Component {...props} />
				// ) : (
				// 	<Redirect to='/login' />
				// )
			}
		/>
	);
};

PrivateRoute.propTypes = {
	userState: PropTypes.object.isRequired,
	loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	userState: state.userState,
});

export default connect(mapStateToProps, { loadUser })(PrivateRoute);
