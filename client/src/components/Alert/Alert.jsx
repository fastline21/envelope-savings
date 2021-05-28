import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { setAlert } from './../../actions/alertAction';

const Alert = ({ setAlert, alertState: { statusCode, message } }) => {
	const [isShow, setIsShow] = useState(false);

	const handleShow = () => {
		setIsShow(true);
	};

	const handleClose = () => {
		setAlert({});
		setIsShow(false);
	};

	useEffect(() => {
		if (statusCode || message) {
			handleShow();
		}

		// eslint-disable-next-line
	}, [statusCode]);

	return (
		<Modal show={isShow} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>{statusCode}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{message}</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={handleClose}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

Alert.propTypes = {
	alertState: PropTypes.object.isRequired,
	setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	alertState: state.alertState,
});

export default connect(mapStateToProps, { setAlert })(Alert);
