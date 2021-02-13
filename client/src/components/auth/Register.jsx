import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { registerUser, setSuccess } from './../../actions/userAction';

// Components
import PreLoader from './../layout/PreLoader';

const Register = ({
	userState: { success, error, loading },
	registerUser,
	setSuccess,
}) => {
	const initialInfo = {
		fullname: '',
		email: '',
		password: '',
		password2: '',
	};
	const [info, setInfo] = useState(initialInfo);
	const [showAlert, setShowAlert] = useState(true);
	const [customAlert, setCustomAlert] = useState(null);
	const { fullname, email, password, password2 } = info;
	const onChange = (e) => {
		const { name, value } = e.target;
		setInfo({ ...info, [name]: value });
	};
	const onSubmit = (e) => {
		e.preventDefault();
		setCustomAlert(null);
		if (
			fullname === '' ||
			fullname === null ||
			fullname === undefined ||
			email === '' ||
			email === null ||
			email === undefined ||
			password === '' ||
			password === null ||
			password === undefined ||
			password2 === '' ||
			password2 === null ||
			password2 === undefined
		) {
			setCustomAlert(
				<Alert
					variant='danger'
					onClose={() => setCustomAlert(null)}
					dismissible
				>
					Please fill in all the required fields.
				</Alert>
			);
		} else if (password !== password2) {
			setCustomAlert(
				<Alert
					variant='danger'
					onClose={() => setCustomAlert(null)}
					dismissible
				>
					Password not match.
				</Alert>
			);
		} else {
			const userFields = {
				fullname,
				email,
				password,
				password2,
			};
			registerUser(userFields);
			setInfo(initialInfo);
			setShowAlert(true);
		}
	};
	const onLoading = (loading, success, error) => {
		if (loading) {
			return <PreLoader />;
		} else {
			if (success) {
				return (
					<Alert
						variant='primary'
						show={showAlert}
						onClose={() => setShowAlert(false)}
						dismissible
					>
						Register success
						<br />
						Please check your email to verify your account. Thank
						you.
					</Alert>
				);
			}
			if (error) {
				return (
					<Alert
						variant='danger'
						show={showAlert}
						onClose={() => setShowAlert(false)}
						dismissible
					>
						{error.msg}
					</Alert>
				);
			}
		}
	};
	return (
		<Container>
			{customAlert}
			{onLoading(loading, success, error)}
			<Row>
				<Col lg={{ span: 6, offset: 3 }}>
					<h1>Register</h1>
					<Form onSubmit={onSubmit}>
						<Form.Group>
							<Form.Label>Full Name:</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter full name'
								name='fullname'
								onChange={onChange}
								value={fullname}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Email:</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter email'
								name='email'
								onChange={onChange}
								value={email}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Password:</Form.Label>
							<Form.Control
								type='password'
								placeholder='Enter password'
								name='password'
								onChange={onChange}
								value={password}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Confirm Password:</Form.Label>
							<Form.Control
								type='password'
								placeholder='Enter confirm password'
								name='password2'
								onChange={onChange}
								value={password2}
							/>
						</Form.Group>
						<Button variant='primary' type='submit'>
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
	registerUser: PropTypes.func.isRequired,
	setSuccess: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	userState: state.userState,
});

export default connect(mapStateToProps, { registerUser, setSuccess })(Register);
