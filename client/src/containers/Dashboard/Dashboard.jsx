import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import { List, Action, Modal } from './../../components/Envelope';
import PreLoader from 'components/PreLoader';

// Actions
import { getAllEnvelopes, currentEnvelope } from 'actions/envelopeAction';

// Utils
import { useClickOutside } from 'utils';

const Dashboard = ({
	getAllEnvelopes,
	currentEnvelope,
	envelopeState: { envelopes, current },
}) => {
	const [exceptionClick, setExceptionClick] = useState(null);
	useEffect(() => {
		getAllEnvelopes();

		// eslint-disable-next-line
	}, []);

	const [showModal, setShowModal] = useState(null);

	const handleModal = (action) => {
		setShowModal(action);
	};

	const handleCurrent = (id) => {
		if (current === id) {
			return currentEnvelope(null);
		}

		currentEnvelope(id);
	};

	const handleClickOutside = useClickOutside(exceptionClick, () => {
		currentEnvelope(null);
	});

	if (envelopes === null) {
		return <PreLoader />;
	}

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
					<List
						setCurrentEnvelope={(id) => handleCurrent(id)}
						listRef={handleClickOutside}
					/>
				</Col>
				<Col xl={3} lg={3} md={12} sm={12}>
					<Action
						showModal={(action) => handleModal(action)}
						actionEnvelope={({ current }) =>
							setExceptionClick(current)
						}
					/>
				</Col>
			</Row>
		</Container>
	);
};

Dashboard.propTypes = {
	envelopeState: PropTypes.object.isRequired,
	getAllEnvelopes: PropTypes.func.isRequired,
	currentEnvelope: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	envelopeState: state.envelopeState,
});

export default connect(mapStateToProps, { getAllEnvelopes, currentEnvelope })(
	Dashboard
);
