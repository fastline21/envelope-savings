import React, { useState, useEffect, useRef, Fragment } from 'react';
import { Modal as BModal, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

// Utils
import { getGoalMoney, stringCapitalized } from 'utils';

// Actions
import { setAlert } from 'actions/alertAction';
import {
	addEnvelope,
	getEnvelope,
	editEnvelope,
	deleteEnvelope,
} from 'actions/envelopeAction';

const Modal = ({
	showModal,
	hideModal,
	setAlert,
	addEnvelope,
	getEnvelope,
	actionEnvelope,
	editEnvelope,
	deleteEnvelope,
	envelopeState: { envelopes, current, envelope, error },
}) => {
	const actionEnvelopeRef = useRef();
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
		if (showModal === 'delete') {
			return (
				<Form onSubmit={handleSubmit}>
					<BModal.Body>
						<Form.Group>
							<Form.Label>
								Are you sure you want to delete {purpose}
							</Form.Label>
						</Form.Group>
					</BModal.Body>
					<BModal.Footer>
						<Button variant='primary' onClick={() => handleClose()}>
							No
						</Button>
						<Button variant='primary' type='submit'>
							Yes
						</Button>
					</BModal.Footer>
				</Form>
			);
		}

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
						<p>{goalMoney.toLocaleString()}</p>
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
			return addEnvelope({
				purpose,
				amount,
				deposit,
			});
		}

		if (showModal === 'edit') {
			return editEnvelope(
				{
					purpose,
					amount,
					deposit,
				},
				{ current }
			);
		}

		if (showModal === 'delete') {
			return deleteEnvelope(current);
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
		actionEnvelope(actionEnvelopeRef);

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

			if (current) {
				getEnvelope(current);
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
	}, [envelopes, envelopeList, current]);

	useEffect(() => {
		if (envelope) {
			setFormData({
				purpose: envelope.purpose,
				amount: envelope.amount,
				deposit: envelope.deposit,
				goalMoney: envelope.goalMoney,
			});
		}
		// eslint-disable-next-line
	}, [envelope]);

	useEffect(() => {
		if (error) {
			setAlert({
				...error,
			});
		}

		// eslint-disable-next-line
	}, [error]);

	return (
		<BModal show={isShow} onHide={handleClose} ref={actionEnvelopeRef}>
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
	getEnvelope: PropTypes.func.isRequired,
	editEnvelope: PropTypes.func.isRequired,
	deleteEnvelope: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	alertState: state.alertState,
	envelopeState: state.envelopeState,
});

export default connect(mapStateToProps, {
	setAlert,
	addEnvelope,
	getEnvelope,
	editEnvelope,
	deleteEnvelope,
})(Modal);
