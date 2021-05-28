import React, { useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { getEnvelope } from 'actions/envelopeAction';

import { Table } from 'components/Envelope';

const Envelope = ({ getEnvelope }) => {
	const { id } = useParams();

	useEffect(() => {
		getEnvelope(id);

		// eslint-disable-next-line
	}, []);
	return (
		<Fragment>
			<h1>Envelope ID: {id}</h1>
			<Table></Table>
		</Fragment>
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
