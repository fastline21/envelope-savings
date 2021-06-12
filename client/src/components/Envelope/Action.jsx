import React, { useRef, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Action = ({ envelopeState: { current }, showModal, actionEnvelope }) => {
	const actionEnvelopeRef = useRef();

	useEffect(() => {
		actionEnvelope(actionEnvelopeRef);

		// eslint-disable-next-line
	}, []);

	return (
		<div id='action' ref={actionEnvelopeRef}>
			<Button
				variant={!current ? 'secondary' : 'primary'}
				size='lg'
				block
				onClick={() => showModal('view')}
				disabled={!current ? true : false}
			>
				View
			</Button>
			<Button
				variant={current ? 'secondary' : 'primary'}
				size='lg'
				block
				onClick={() => showModal('add')}
				disabled={current ? true : false}
			>
				Add
			</Button>
			<Button
				variant={!current ? 'secondary' : 'primary'}
				size='lg'
				block
				onClick={() => showModal('edit')}
				disabled={!current ? true : false}
			>
				Edit
			</Button>
			<Button
				variant={!current ? 'secondary' : 'primary'}
				size='lg'
				block
				onClick={() => showModal('delete')}
				disabled={!current ? true : false}
			>
				Delete
			</Button>
		</div>
	);
};

Action.propTypes = {
	envelopeState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	envelopeState: state.envelopeState,
});

export default connect(mapStateToProps)(Action);
