import React, { useState } from 'react';
import moment from 'moment';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
	const [today, setToday] = useState(
		moment().format('MM/DD/YYYY hh:mm:ss A')
	);
	setInterval(() => {
		setToday(moment().format('MM/DD/YYYY hh:mm:ss A'));
	}, 1000);
	return (
		<Container>
			<Row>
				<Col>
					<p>{today}</p>
				</Col>
				<Col>
					<p className='text-end'>v{process.env.VERSION || '0.00'}</p>
				</Col>
			</Row>
		</Container>
	);
};

export default Footer;
