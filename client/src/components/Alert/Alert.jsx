import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

	const getFirstNumberStatusCode = parseInt(statusCode.toString().charAt(0));

	const modalHeaderStyle = () => {
		if (getFirstNumberStatusCode === 4) {
			return 'bg-danger';
		}

		return 'bg-success';
	};

	const ModalHeaderIcon = () => {
		if (getFirstNumberStatusCode === 4) {
			return <FontAwesomeIcon icon={['far', 'times-circle']} size='4x' />;
		}
		return <FontAwesomeIcon icon={['far', 'check-circle']} size='4x' />;
	};

	useEffect(() => {
		if (statusCode || message) {
			handleShow();
		}

		// eslint-disable-next-line
	}, [statusCode]);

	return (
		<Modal show={isShow} onHide={handleClose}>
			<Modal.Header className={`${modalHeaderStyle()} border-bottom-0`}>
				<Modal.Title className='mx-auto'>
					<ModalHeaderIcon />
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className='bg-white text-dark text-center'>
				<p className='mb-0 alert-modal-message'>{message}</p>
			</Modal.Body>
			<Modal.Footer className='bg-white text-dark border-top-0 justify-content-around'>
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
