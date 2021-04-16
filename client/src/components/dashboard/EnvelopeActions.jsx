import React, { useState, Fragment } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Components
import EnvelopeModal from "./EnvelopeModal";

const EnvelopeActions = ({ envelopeState: { selected } }) => {
	const [showModal, setShowModal] = useState(null);

	return (
		<Fragment>
			{showModal && (
				<EnvelopeModal
					showModal={showModal}
					hideModal={() => setShowModal(null)}
				/>
			)}
			<Button
				variant="primary"
				size="lg"
				block
				onClick={() => setShowModal("view")}
				disabled={!selected ? true : false}
			>
				View
			</Button>
			<Button
				variant="success"
				size="lg"
				block
				onClick={() => setShowModal("add")}
				disabled={selected ? true : false}
			>
				Add
			</Button>
			<Button
				variant="warning"
				size="lg"
				block
				disabled={selected ? true : false}
			>
				Edit
			</Button>
			<Button
				variant="danger"
				size="lg"
				block
				disabled={selected ? true : false}
			>
				Delete
			</Button>
		</Fragment>
	);
};

EnvelopeActions.propTypes = {
	envelopeState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	envelopeState: state.envelopeState,
});

export default connect(mapStateToProps)(EnvelopeActions);
