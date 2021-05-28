import React, { useState, useEffect } from 'react';
import { Modal as BModal, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Utils
import { getGoalMoney, stringCapitalized } from 'utils';

// Actions
import { setAlert } from 'actions/alertAction';
import { addEnvelope } from 'actions/envelopeAction';

const Modal = ({
	showModal,
	hideModal,
	setAlert,
	addEnvelope,
	envelopeState: { envelopes, loading },
}) => {
	const [isShow, setIsShow] = useState(false);

	const initialFormData = {
		purpose: '',
		amount: '',
		deposit: '',
		goalMoney: 0,
	};
	const [formData, setFormData] = useState(initialFormData);

	const [envelopeList, setEnvelopeList] = useState(null);

	const { purpose, amount, deposit, goalMoney } = formData;

	const handleChange = (event) => {
		const { name, value } = event.target;

		if (name === 'amount') {
			return setFormData({
				...formData,
				[name]: parseInt(value),
				goalMoney: getGoalMoney(value),
			});
		}

		setFormData({ ...formData, [name]: value });
	};

	const formRender = () => {
		if (showModal !== 'view') {
			return (
				<Form onSubmit={handleSubmit}>
					<BModal.Body>
						<Form.Group controlId='purposeInput'>
							<Form.Label>Purpose:</Form.Label>
							<Form.Control
								type='text'
								name='purpose'
								placeholder='Enter purpose'
								value={purpose}
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group controlId='amountInput'>
							<Form.Label>Amount:</Form.Label>
							<Form.Control
								type='number'
								name='amount'
								placeholder='Enter amount'
								value={amount}
								onChange={handleChange}
								min={0}
								max={10000}
							/>
						</Form.Group>
						<Form.Group controlId='depositInput'>
							<Form.Label>Deposit:</Form.Label>
							<Form.Control
								type='text'
								name='deposit'
								placeholder='Enter deposit'
								value={deposit}
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group controlId='goalMoneyInput'>
							<Form.Label>Goal Money:</Form.Label>
							<p>{goalMoney.toLocaleString()}</p>
						</Form.Group>
					</BModal.Body>
					<BModal.Footer>
						<Button variant='primary' type='submit'>
							Submit
						</Button>
					</BModal.Footer>
				</Form>
			);
		}

		return (
			<div>
				<label htmlFor=''>Purpose</label>
				<p>{purpose}</p>
			</div>
		);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (!purpose || !amount || !deposit || !goalMoney) {
			return setAlert({
				statusCode: 404,
				message: 'Please fill in all the required fields.',
			});
		}

		if (showModal === 'add') {
			addEnvelope({
				purpose,
				amount,
				deposit,
			});
		}
	};

	const handleShow = () => {
		setIsShow(true);
	};

	const handleClose = () => {
		setFormData(initialFormData);
		hideModal();
		setIsShow(false);
	};

	useEffect(() => {
		if (showModal) {
			handleShow();
		}

		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (envelopeList === null) {
			setEnvelopeList(envelopes);
		}

		if (
			envelopes !== null &&
			envelopeList !== null &&
			JSON.stringify(envelopes) !== JSON.stringify(envelopeList)
		) {
			handleClose();
		}

		// eslint-disable-next-line
	}, [envelopes, envelopeList]);

	return (
		<BModal show={isShow} onHide={handleClose}>
			<BModal.Header closeButton>
				<BModal.Title>{stringCapitalized(showModal)}</BModal.Title>
			</BModal.Header>
			{formRender()}
		</BModal>
	);
};

Modal.propTypes = {
	alertState: PropTypes.object.isRequired,
	envelopeState: PropTypes.object.isRequired,
	setAlert: PropTypes.func.isRequired,
	addEnvelope: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	alertState: state.alertState,
	envelopeState: state.envelopeState,
});

export default connect(mapStateToProps, { setAlert, addEnvelope })(Modal);
