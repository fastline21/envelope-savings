import React from "react";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Components
import PreLoader from "./../layout/PreLoader";

const EnvelopeList = ({ envelopeState: { envelopes, loading } }) => {
	if (envelopes === null || loading) {
		return <PreLoader />;
	}

	return envelopes.length === 0 ? (
		<p>No envelope found</p>
	) : (
		<Table>
			<thead>
				<tr>
					<th>#</th>
					<th>Purpose</th>
					<th>Goal Money</th>
					<th>Date</th>
				</tr>
			</thead>
		</Table>
	);
};

EnvelopeList.propTypes = {
	envelopeState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	envelopeState: state.envelopeState,
});

export default connect(mapStateToProps)(EnvelopeList);
