import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { loadUser } from './../../actions/userAction';

// Containers
import Dashboard from './../../containers/Dashboard';

// Components
import PreLoader from './../../components/PreLoader';

const PrivateRoute = ({
	loadUser,
	userState: { user, loading },
	component: Component,
	...rest
}) => {
	const [isLoading, setIsLoading] = useState(null);

	// 1st run
	useEffect(() => {
		if (localStorage.token) {
			setIsLoading(true);
			return loadUser();
		}

		// eslint-disable-next-line
	}, []);

	// 2nd run
	useEffect(() => {
		if (isLoading && !loading) {
			setInterval(() => {
				setIsLoading(false);
			}, 500);
		}

		// eslint-disable-next-line
	}, [loading]);

	if (isLoading) {
		return <PreLoader />;
	}

	return (
		<Route
			{...rest}
			render={(props) =>
				user ? (
					Component.name === 'Home' ? (
						<Dashboard />
					) : (
						<Component {...props} />
					)
				) : Component.name === 'Home' ? (
					<Component {...props} />
				) : (
					<Redirect to='/login' />
				)
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