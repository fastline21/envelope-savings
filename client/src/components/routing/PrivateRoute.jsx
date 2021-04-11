import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Actions
import { loadUser } from "./../../actions/userAction";
import { setAlert } from "../../actions/alertAction";

// Components
import LoadUser from "./../auth/LoadUser";
import PreLoader from "./../layout/PreLoader";

const PrivateRoute = ({
	userState: { isAuthenticated, loading, error },
	loadUser,
	component: Component,
	...rest
}) => {
	if (loading) {
		return <PreLoader />;
	}
	if (error) {
		return <Redirect to="/login" />;
	}

	return (
		<Route
			{...rest}
			render={(props) =>
				!localStorage.token ? (
					<Redirect to="/login" />
				) : (
					isAuthenticated && <Component {...props} />
				)
			}
		/>
	);
};

PrivateRoute.propTypes = {
	userState: PropTypes.object.isRequired,
	loadUser: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	userState: state.userState,
});

export default connect(mapStateToProps, { loadUser, setAlert })(PrivateRoute);
