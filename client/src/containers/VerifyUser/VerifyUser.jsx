import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { verifyUser } from 'actions/userAction';
import { setAlert } from 'actions/alertAction';

// Components
import PreLoader from 'components/PreLoader';

const VerifyUser = ({
	verifyUser,
	setAlert,
	userState: { verifyMessage, error, loading },
}) => {
	const { token } = useParams();

	const history = useHistory();

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

	useEffect(() => {
		if (error || verifyMessage) {
			if (error) {
				setAlert({
					...error,
				});
			}

			if (verifyMessage) {
				setAlert({
					statusCode: 200,
					message: verifyMessage,
				});
			}

			history.push('/login');
		}

		// eslint-disable-next-line
	}, [verifyMessage, error]);

	if (isLoading) {
		return <PreLoader />;
	}

	return null;
};

VerifyUser.propTypes = {
	userState: PropTypes.object.isRequired,
	verifyUser: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	userState: state.userState,
});

export default connect(mapStateToProps, { verifyUser, setAlert })(VerifyUser);
