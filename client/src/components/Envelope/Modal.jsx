import React, { useState, useEffect } from 'react';
import { Modal as BModal, Button, Form } from 'react-bootstrap';

// Utils
import getGoalMoney from 'utils/getGoalMoney';

const Modal = ({ showModal, hideModal }) => {
	const [isShow, setIsShow] = useState(false);

	const initialFormData = {
		purpose: '',
		amount: '',
		deposit: '',
		goalMoney: 0,
	};
	const [formData, setFormData] = useState(initialFormData);

	const { purpose, amount, deposit, goalMoney } = formData;

	const handleChange = (event) => {
		const { name, value } = event.target;

		if (name === 'amount') {
			try {
				setFormData({
					...formData,
					[name]: parseInt(value),
					goalMoney: getGoalMoney(value),
				});
			} catch (error) {
				setFormData({
					...formData,
					[name]: '',
					goalMoney: 0,
				});
			}

			return;
		}

		setFormData({ ...formData, [name]: value });
	};

	const formRender = () => {
		if (showModal !== 'view') {
			return (
				<Form onSubmit={onSubmit}>
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

		// This return is for view showModal
		return (
			<div>
				<label htmlFor=''>Purpose</label>
				<p>{purpose}</p>
			</div>
		);
	};

	// Form Submit
	const onSubmit = (e) => {
		e.preventDefault();

		// if (!purpose || !amount || !deposit || !goalMoney) {
		// 	// setAlert({
		// 	// 	type: "danger",
		// 	// 	message: "Please fill in all the required fields.",
		// 	// 	isModal: true,
		// 	// });

		// 	// Temp show error
		// 	alert('Please fill in all the required fields.');
		// }

		// if (showModal === 'add') {
		// 	addEnvelope({ purpose, amount, deposit });
		// 	setInfo(initialInfo);
		// }
	};

	const handleShow = () => {
		setIsShow(true);
	};

	const handleClose = () => {
		hideModal();
		setIsShow(false);
	};

	useEffect(() => {
		if (showModal) {
			handleShow();
		}

		// eslint-disable-next-line
	}, []);

	return (
		<BModal show={isShow} onHide={handleClose}>
			<BModal.Header closeButton>
				<BModal.Title></BModal.Title>
			</BModal.Header>
			{formRender()}
			{/* <BModal.Body></BModal.Body>
			<BModal.Footer>
				<Button variant='secondary' onClick={handleClose}>
					Close
				</Button>
				<Button variant='primary' onClick={handleClose}>
					Save Changes
				</Button>
			</BModal.Footer> */}
		</BModal>
	);
};

export default Modal;
