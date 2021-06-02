import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

// Actions
import { registerUser } from 'actions/userAction';
import { setAlert } from 'actions/alertAction';

// Components
import PreLoader from 'components/PreLoader';

const Register = ({
	registerUser,
	setAlert,
	userState: { success, error, loading },
}) => {
	const history = useHistory();

	const initialFormData = {
		fullname: '',
		email: '',
		password: '',
		password2: '',
	};

	const [formData, setFormData] = useState(initialFormData);

	const { fullname, email, password, password2 } = formData;

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!fullname || !email || !password || !password2) {
			return setAlert({
				statusCode: 404,
				message: 'Please fill in all the required fields.',
			});
		}

		if (password !== password2) {
			return setAlert({
				statusCode: 400,
				message: 'Password not match.',
			});
		}

		registerUser({
			fullname,
			email,
			password,
			password2,
		});
	};

	useEffect(() => {
		if (error) {
			setAlert({
				...error,
			});
		}

		if (success) {
			setAlert({ ...success, statusCode: 200 });
			history.push('/');
		}

		// eslint-disable-next-line
	}, [success, error]);

	if (loading) {
		return <PreLoader />;
	}

	return (
		<Container>
			<Row>
				<Col lg={{ span: 6, offset: 3 }}>
					<h1>Register</h1>
					<Form onSubmit={handleSubmit}>
						<Form.Group>
							<Form.Label>Fullname:</Form.Label>
							<Form.Control
								type='fullname'
								placeholder='Enter fullname'
								name='fullname'
								value={fullname}
								onChange={handleChange}
							/>
						</Form.Group>
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
						<Form.Group>
							<Form.Label>Confirm Password:</Form.Label>
							<Form.Control
								type='password'
								placeholder='Enter confirm password'
								name='password2'
								value={password2}
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
	registerUser: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	userState: state.userState,
});

export default connect(mapStateToProps, { registerUser, setAlert })(Register);
