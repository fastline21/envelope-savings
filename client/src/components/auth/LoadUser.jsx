import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Actions
import { loadUser } from "./../../actions/userAction";

const LoadUser = ({ loadUser }) => {
	const token = localStorage.token;
	useEffect(() => {
		if (token) {
			loadUser();
		}
	}, []);
	return null;
};

LoadUser.propTypes = {
	loadUser: PropTypes.func.isRequired,
};

export default connect(null, {
	loadUser,
})(LoadUser);
