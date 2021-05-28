import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';

// Actions
import { getEnvelope } from 'actions/envelopeAction';

// Components
import { Table } from 'components/Envelope';

const Envelope = ({ getEnvelope, envelopeState: { envelope } }) => {
	const { id } = useParams();

	useEffect(() => {
		getEnvelope(id);

		// eslint-disable-next-line
	}, []);

	return (
		<Container className='pt-5'>
			<Row>
				<Col xl={9} lg={9} md={12} sm={12}>
					<h1>Envelope ID: {id}</h1>
					<Table />
				</Col>
				<Col xl={3} lg={3} md={12} sm={12}></Col>
			</Row>
		</Container>
	);
};

Envelope.propTypes = {
	envelopeState: PropTypes.object.isRequired,
	getEnvelope: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	envelopeState: state.envelopeState,
});

export default connect(mapStateToProps, { getEnvelope })(Envelope);
