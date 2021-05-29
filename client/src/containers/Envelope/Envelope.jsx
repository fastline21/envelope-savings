import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';

// Actions
import { getEnvelope, rollNumber } from 'actions/envelopeAction';

// Components
import { Table, Roll, CurrentNumber } from 'components/Envelope';
import PreLoader from 'components/PreLoader';

const Envelope = ({
	getEnvelope,
	rollNumber,
	envelopeState: { envelope, roll, loading },
}) => {
	const { id } = useParams();

	useEffect(() => {
		getEnvelope(id);

		// eslint-disable-next-line
	}, []);

	if (!envelope) {
		return <PreLoader />;
	}

	return (
		<Container className='pt-5'>
			<Row>
				<Col xl={9} lg={9} md={12} sm={12}>
					<h1>Envelope ID: {id}</h1>
					<Table envelope={envelope} />
				</Col>
				<Col xl={3} lg={3} md={12} sm={12}>
					<CurrentNumber
						roll={envelope.latestEnvelope.money || roll}
					/>
					<Roll rollNumber={() => rollNumber(id)} />
				</Col>
			</Row>
		</Container>
	);
};

Envelope.propTypes = {
	envelopeState: PropTypes.object.isRequired,
	getEnvelope: PropTypes.func.isRequired,
	rollNumber: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	envelopeState: state.envelopeState,
});

export default connect(mapStateToProps, { getEnvelope, rollNumber })(Envelope);
