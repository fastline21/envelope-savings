import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

// Components
import { List, Action, Modal } from './../../components/Envelope';

const Dashboard = () => {
	const [showModal, setShowModal] = useState(null);

	const handleModal = (action) => {
		setShowModal(action);
	};

	return (
		<Container className='pt-5'>
			{showModal && (
				<Modal
					showModal={showModal}
					hideModal={() => handleModal(null)}
				/>
			)}
			<Row>
				<Col xl={9} lg={9} md={12} sm={12}>
					<List />
				</Col>
				<Col xl={3} lg={3} md={12} sm={12}>
					<Action showModal={(action) => handleModal(action)} />
				</Col>
			</Row>
		</Container>
	);
};

export default Dashboard;
