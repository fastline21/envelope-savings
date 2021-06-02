import React, { useEffect, useState } from 'react';
import { Route, Redirect, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { verifyUser } from 'actions/userAction';

// Components
import PreLoader from 'components/PreLoader';

const VerifyUser = ({ verifyUser, userState: { user, error, loading } }) => {
	const { token } = useParams();

	const [isLoading, setIsLoading] = useState(null);

	if (isLoading === null) {
		setIsLoading(true);
	}

	// 1st run
	useEffect(() => {
		if (isLoading) {
			return verifyUser(token);
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
	// return (
	// 	<Route
	// 		render={() =>
	// 			user ? <Redirect to='/dashboard' /> : <Redirect to='/login' />
	// 		}
	// 	/>
	// );
	return null;
};

VerifyUser.propTypes = {
	userState: PropTypes.object.isRequired,
	verifyUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	userState: state.userState,
});

export default connect(mapStateToProps, { verifyUser })(VerifyUser);
