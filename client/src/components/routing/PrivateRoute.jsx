import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Components
import PreLoader from "./../layout/PreLoader";

// Actions
import { loadUser } from "./../../actions/userAction";

const PrivateRoute = ({
	userState: { isAuthenticated, loading },
	loadUser,
	component: Component,
	...rest
}) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				loading ? (
					<PreLoader />
				) : isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect to="/login" />
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
