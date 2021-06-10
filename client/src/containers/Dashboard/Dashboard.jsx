import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import { List, Action, Modal } from './../../components/Envelope';
import PreLoader from 'components/PreLoader';

// Actions
import {
	getAllEnvelopes,
	currentEnvelope,
	clearCurrent,
} from 'actions/envelopeAction';

// Utils
import { useClickOutside } from 'utils';

const Dashboard = ({
	getAllEnvelopes,
	currentEnvelope,
	clearCurrent,
	envelopeState: { envelopes, current },
}) => {
	const [exceptionClick, setExceptionClick] = useState([]);
	useEffect(() => {
		getAllEnvelopes();

		// eslint-disable-next-line
	}, []);

	const [showModal, setShowModal] = useState(null);

	const handleModal = (action) => {
		if (!action && current) {
			clearCurrent();
		}
		setShowModal(action);
	};

	const handleCurrent = (id) => {
		if (current === id) {
			return clearCurrent();
		}

		currentEnvelope(id);
	};

	const handleClickOutside = useClickOutside(exceptionClick, () => {
		clearCurrent();
	});

	if (envelopes === null) {
		return <PreLoader />;
	}

	return (
		<Container className='pt-5'>
			{showModal && (
				<Modal
					showModal={showModal}
					hideModal={() => {
						handleModal(null);
					}}
					actionEnvelope={({ current }) =>
						setExceptionClick([...exceptionClick, current])
					}
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
							setExceptionClick([...exceptionClick, current])
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
	clearCurrent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	envelopeState: state.envelopeState,
});

export default connect(mapStateToProps, {
	getAllEnvelopes,
	currentEnvelope,
	clearCurrent,
})(Dashboard);
