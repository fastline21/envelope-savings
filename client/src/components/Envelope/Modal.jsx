import React, { useState, useEffect } from 'react';
import { Modal as BModal, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

// Utils
import { getGoalMoney, stringCapitalized } from 'utils';

// Actions
import { setAlert } from 'actions/alertAction';
import { addEnvelope } from 'actions/envelopeAction';
import { Fragment } from 'react';

const Modal = ({
	showModal,
	hideModal,
	setAlert,
	addEnvelope,
	envelopeState: { envelopes, current },
}) => {
	const history = useHistory();
	const [isShow, setIsShow] = useState(false);

	const initialFormData = {
		purpose: '',
		amount: '',
		deposit: '',
		goalMoney: 0,
	};
	const [formData, setFormData] = useState(initialFormData);

	const [envelopeList, setEnvelopeList] = useState(null);

	const [currentEnvelope, setCurrentEnvelope] = useState(null);

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
		return (
			<Form onSubmit={handleSubmit}>
				<BModal.Body>
					<Form.Group controlId='purposeInput'>
						<Form.Label>Purpose:</Form.Label>
						<br />
						{showModal === 'view' ? (
							<Form.Label>
								{currentEnvelope && currentEnvelope.purpose}
							</Form.Label>
						) : (
							<Form.Control
								type='text'
								name='purpose'
								placeholder='Enter purpose'
								value={purpose}
								onChange={handleChange}
							/>
						)}
					</Form.Group>
					<Form.Group controlId='amountInput'>
						<Form.Label>Amount:</Form.Label>
						<br />
						{showModal === 'view' ? (
							<Form.Label>
								{currentEnvelope && currentEnvelope.amount}
							</Form.Label>
						) : (
							<Form.Control
								type='number'
								name='amount'
								placeholder='Enter amount'
								value={amount}
								onChange={handleChange}
								min={0}
								max={10000}
							/>
						)}
					</Form.Group>
					<Form.Group controlId='depositInput'>
						<Form.Label>Deposit:</Form.Label>
						{showModal === 'view' ? (
							<Fragment>
								<br />
								<Form.Label>
									{currentEnvelope && currentEnvelope.deposit}
								</Form.Label>
							</Fragment>
						) : (
							<Form.Control
								type='text'
								name='deposit'
								placeholder='Enter deposit'
								value={deposit}
								onChange={handleChange}
							/>
						)}
					</Form.Group>
					<Form.Group controlId='goalMoneyInput'>
						<Form.Label>Goal Money:</Form.Label>
						<p>
							{(currentEnvelope && currentEnvelope.goalMoney) ||
								goalMoney.toLocaleString()}
						</p>
					</Form.Group>
				</BModal.Body>
				<BModal.Footer>
					{showModal === 'view' ? (
						<Button
							variant='primary'
							onClick={() =>
								history.push(`/${currentEnvelope._id}`)
							}
						>
							Load Envelope
						</Button>
					) : (
						<Button variant='primary' type='submit'>
							Submit
						</Button>
					)}
				</BModal.Footer>
			</Form>
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
			if (showModal === 'view') {
				setCurrentEnvelope(
					...envelopes.filter((e) => e._id === current)
				);
			}

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
