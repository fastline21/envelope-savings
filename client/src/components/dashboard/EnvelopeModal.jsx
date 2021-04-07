import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Utils
import stringCapitilized from "./../../utils/stringCapitalized";

// Actions
import { setAlert } from "./../../actions/alertAction";

const EnvelopeModal = ({ showModal, hideModal, setAlert }) => {
	// State for showing modal
	const [show, setShow] = useState(false);

	// Close modal
	const handleClose = () => {
		hideModal();
		setShow(false);
	};

	// Open modal
	const handleShow = () => setShow(true);

	// Initial state value
	const initialInfo = {
		purpose: "",
		amount: 0,
		deposit: "",
		goalMoney: 0,
	};

	// Info state
	const [info, setInfo] = useState(initialInfo);

	// Extracting info state
	const { purpose, amount, deposit, goalMoney } = info;

	// When input value change
	const onChange = (e) => {
		const { name, value } = e.target;
		if (name === "amount" && typeof value === "string")
			return setInfo({ ...info, [name]: parseInt(value) });
		setInfo({ ...info, [name]: value });
	};

	// Form render function
	const formRender = (showModal) => {
		// Render Form if showModal is not view
		if (showModal !== "view") {
			return (
				<Form onSubmit={onSubmit}>
					<Modal.Body>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Purpose:</Form.Label>
							<Form.Control
								type="text"
								name="purpose"
								placeholder="Enter purpose"
								value={purpose}
								onChange={onChange}
							/>
						</Form.Group>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Amount:</Form.Label>
							<Form.Control
								type="number"
								name="amount"
								placeholder="Enter amount"
								value={amount}
								onChange={onChange}
							/>
						</Form.Group>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Deposit:</Form.Label>
							<Form.Control
								type="text"
								name="deposit"
								placeholder="Enter deposit"
								value={deposit}
								onChange={onChange}
							/>
						</Form.Group>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Goal Money:</Form.Label>
							<p>{goalMoney.toLocaleString()}</p>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="primary" type="submit">
							Submit
						</Button>
					</Modal.Footer>
				</Form>
			);
		}

		// This return is for view showModal
		return (
			<div>
				<label htmlFor="">Purpose</label>
				<p>{purpose}</p>
			</div>
		);
	};

	// Form Submit
	const onSubmit = (e) => {
		e.preventDefault();

		if (!purpose || !amount || !deposit || !goalMoney) {
			setAlert({
				type: "danger",
				message: "Please fill in all the required fields.",
			});
		}
	};

	useEffect(() => {
		// Show Envelope Modal
		if (showModal) {
			handleShow();
		}

		// Set Goal Money when amount input change it's value
		const setGoalMoney = () => {
			let goal = 0;
			for (let i = 0; i <= amount; i++) {
				goal += i;
			}
			setInfo({ ...info, goalMoney: goal });
		};
		setGoalMoney();

		// eslint-disable-next-line
	}, [showModal, amount]);
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>
					{stringCapitilized(showModal)} Envelope
				</Modal.Title>
			</Modal.Header>
			{formRender(showModal)}
			{/* <Modal.Body>{formRender(showModal)}</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button variant="primary" onClick={handleClose}>
					Save Changes
				</Button>
			</Modal.Footer> */}
		</Modal>
	);
};

EnvelopeModal.propTypes = {
	setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(EnvelopeModal);
