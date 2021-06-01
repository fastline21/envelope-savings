import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

// Actions
import { registerUser } from 'actions/userAction';
import { setAlert } from 'actions/alertAction';

const Register = ({ registerUser, setAlert, userState: { user, error } }) => {
	const history = useHistory();

	const initialFormData = {
		email: '',
		password: '',
	};

	const [formData, setFormData] = useState(initialFormData);

	const { email, password } = formData;

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!email || !password) {
			return setAlert({
				statusCode: 404,
				message: 'Please fill in all the required fields.',
			});
		}
		loginUser({
			email,
			password,
		});
	};

	useEffect(() => {
		if (error) {
			setAlert({
				...error,
			});
		}

		if (user) {
			history.push('/dashboard');
		}

		// eslint-disable-next-line
	}, [user, error]);

	return (
		<Container>
			<Row>
				<Col lg={{ span: 6, offset: 3 }}>
					<h1>Login</h1>
					<Form onSubmit={handleSubmit}>
						<Form.Group>
							<Form.Label>Email:</Form.Label>
							<Form.Control
								type='email'
								placeholder='Enter email'
								name='email'
								value={email}
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Password:</Form.Label>
							<Form.Control
								type='password'
								placeholder='Enter password'
								name='password'
								value={password}
								onChange={handleChange}
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
	loginUser: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	userState: state.userState,
});

export default connect(mapStateToProps, { loginUser, setAlert })(Register);
