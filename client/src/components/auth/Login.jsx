import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

// Components
import PreLoader from "./../layout/PreLoader";

// Actions
import { setAlert } from "./../../actions/alertAction";
import { loginUser, clearErrors } from "./../../actions/userAction";

const Login = ({
	userState: { isAuthenticated, error, loading },
	setAlert,
	loginUser,
	clearErrors,
}) => {
	const history = useHistory();
	const initialInfo = {
		email: "",
		password: "",
	};
	const [info, setInfo] = useState(initialInfo);
	const { email, password } = info;
	const onChange = (e) => {
		const { name, value } = e.target;
		setInfo({ ...info, [name]: value });
	};
	const onSubmit = (e) => {
		e.preventDefault();
		if (
			email === "" ||
			email === null ||
			email === undefined ||
			password === "" ||
			password === null ||
			password === undefined
		) {
			setAlert({
				type: "danger",
				message: "Please fill in all the required fields.",
			});
		} else {
			const userFields = {
				email,
				password,
			};
			loginUser(userFields);
			setInfo(initialInfo);
		}
	};
	useEffect(() => {
		if (isAuthenticated) {
			history.push("/dashboard");
		}

		if (error) {
			setAlert({ type: "danger", message: error.msg || error });
			clearErrors();
		}
		// eslint-disable-next-line
	}, [loading, error, isAuthenticated]);
	return (
		<Container>
			{loading && <PreLoader />}
			<Row>
				<Col lg={{ span: 6, offset: 3 }}>
					<h1>Login</h1>
					<Form onSubmit={onSubmit}>
						<Form.Group>
							<Form.Label>Email:</Form.Label>
							<Form.Control
								type="email"
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
						<Button variant="primary" type="submit">
							Submit
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

Login.propTypes = {
	userState: PropTypes.object.isRequired,
	setAlert: PropTypes.func.isRequired,
	loginUser: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	userState: state.userState,
});

export default connect(mapStateToProps, {
	setAlert,
	loginUser,
	clearErrors,
})(Login);
