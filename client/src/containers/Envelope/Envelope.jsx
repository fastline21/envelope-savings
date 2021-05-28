import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { getEnvelope } from 'actions/envelopeAction';

const Envelope = ({ getEnvelope }) => {
	const { id } = useParams();

	useEffect(() => {
		getEnvelope(id);

		// eslint-disable-next-line
	}, []);
	return <h1>Envelope ID: {id}</h1>;
};

Envelope.propTypes = {
	envelopeState: PropTypes.object.isRequired,
	getEnvelope: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	envelopeState: state.envelopeState,
});

export default connect(mapStateToProps, { getEnvelope })(Envelope);
