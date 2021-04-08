import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Alert } from "react-bootstrap";

// Actions
import { setAlert } from "./../../actions/alertAction";

const AlertMsg = ({ alertState: { type, message }, setAlert }) => {
	return (
		type !== null &&
		message !== null && (
			<Alert
				variant={type}
				onClose={() => setAlert({ type: null, message: null })}
				dismissible
			>
				{message}
			</Alert>
		)
	);
};

AlertMsg.propTypes = {
	alertState: PropTypes.object.isRequired,
	setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	alertState: state.alertState,
});

export default connect(mapStateToProps, { setAlert })(AlertMsg);
