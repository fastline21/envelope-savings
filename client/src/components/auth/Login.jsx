import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

// Components
import PreLoader from './../layout/PreLoader';

const Login = ({ userState: { success, error, loading } }) => {
	const history = useHistory();
	const initialInfo = {
		email: '',
		password: '',
	};
	const [info, setInfo] = useState(initialInfo);
	const [showAlert, setShowAlert] = useState(true);
	const [customAlert, setCustomAlert] = useState(null);
	const { email, password } = info;
	const onChange = (e) => {
		const { name, value } = e.target;
		setInfo({ ...info, [name]: value });
	};
	const onSubmit = (e) => {
		e.preventDefault();
		if (
			email === '' ||
			email === null ||
			email === undefined ||
			password === '' ||
			password === null ||
			password === undefined
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
		} else {
			const userFields = {
				email,
				password,
			};
			// registerUser(userFields);
			setInfo(initialInfo);
			setShowAlert(true);
		}
	};
	const onLoading = (loading, success, error) => {
		if (loading) {
			return <PreLoader />;
		} else {
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
	useEffect(() => {
		if (success) {
			history.push('/dashboard');
		}
	}, [loading, error, success]);
	return (
		<Container>
			{customAlert}
			{onLoading(loading, success, error)}
			<Row>
				<Col lg={{ span: 6, offset: 3 }}>
					<h1>Login</h1>
					<Form onSubmit={onSubmit}>
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
						<Button variant='primary' type='submit'>
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
};

const mapStateToProps = (state) => ({
	userState: state.userState,
});

export default connect(mapStateToProps)(Login);
