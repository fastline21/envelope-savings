import React, { Fragment } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import { Modal } from './Modal';

const Action = ({ envelopeState: { current }, showModal }) => {
	return (
		<Fragment>
			<Button
				variant='primary'
				size='lg'
				block
				// onClick={() => setShowModal('view')}
				disabled={!current ? true : false}
			>
				View
			</Button>
			<Button
				variant='primary'
				size='lg'
				block
				onClick={() => showModal('add')}
				disabled={current ? true : false}
			>
				Add
			</Button>
			<Button
				variant='primary'
				size='lg'
				block
				disabled={current ? true : false}
			>
				Edit
			</Button>
			<Button
				variant='primary'
				size='lg'
				block
				disabled={current ? true : false}
			>
				Delete
			</Button>
		</Fragment>
	);
};

Action.propTypes = {
	envelopeState: PropTypes.object.isRequired,
	isShowModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	envelopeState: state.envelopeState,
});

export default connect(mapStateToProps)(Action);
