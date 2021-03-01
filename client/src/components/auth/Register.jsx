import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Actions
import {
	registerUser,
	clearSuccess,
	clearErrors,
} from "./../../actions/userAction";
import { setAlert } from "./../../actions/alertAction";

// Components
import PreLoader from "./../layout/PreLoader";

const Register = ({
	userState: { success, error, loading },
	setAlert,
	registerUser,
	clearSuccess,
	clearErrors,
}) => {
	const initialInfo = {
		fullname: "",
		email: "",
		password: "",
		password2: "",
	};
	const [info, setInfo] = useState(initialInfo);
	const { fullname, email, password, password2 } = info;
	const onChange = (e) => {
		const { name, value } = e.target;
		setInfo({ ...info, [name]: value });
	};
	const onSubmit = (e) => {
		e.preventDefault();
		if (
			fullname === "" ||
			fullname === null ||
			fullname === undefined ||
			email === "" ||
			email === null ||
			email === undefined ||
			password === "" ||
			password === null ||
			password === undefined ||
			password2 === "" ||
			password2 === null ||
			password2 === undefined
		) {
			setAlert({
				type: "danger",
				message: "Please fill in all the required fields.",
			});
		} else if (password !== password2) {
			setAlert({ type: "danger", message: "Password not match." });
		} else {
			const userFields = {
				fullname,
				email,
				password,
				password2,
			};
			registerUser(userFields);
			setInfo(initialInfo);
		}
	};
	useEffect(() => {
		if (error) {
			setAlert({ type: "danger", message: error.msg || error });
			clearErrors();
		}

		if (success) {
			setAlert({
				type: "primary",
				message:
					"Register success. Please check your email to verify your account.",
			});
			clearSuccess();
		}
	}, [loading, error, success]);
	return (
		<Container>
			{loading && <PreLoader />}
			<Row>
				<Col lg={{ span: 6, offset: 3 }}>
					<h1>Register</h1>
					<Form onSubmit={onSubmit}>
						<Form.Group>
							<Form.Label>Full Name:</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter full name"
								name="fullname"
								onChange={onChange}
								value={fullname}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Email:</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter email"
								name="email"
								onChange={onChange}
								value={email}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Password:</Form.Label>
							<Form.Control
								type="password"
								placeholder="Enter password"
								name="password"
								onChange={onChange}
								value={password}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Confirm Password:</Form.Label>
							<Form.Control
								type="password"
								placeholder="Enter confirm password"
								name="password2"
								onChange={onChange}
								value={password2}
							/>
						</Form.Group>
						<Button variant="primary" type="submit">
							Submit
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

Register.propTypes = {
	userState: PropTypes.object.isRequired,
	setAlert: PropTypes.func.isRequired,
	registerUser: PropTypes.func.isRequired,
	clearSuccess: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	userState: state.userState,
});

export default connect(mapStateToProps, {
	setAlert,
	clearSuccess,
	registerUser,
	clearErrors,
})(Register);
