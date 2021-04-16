import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";

// Components
import PreLoader from "./../layout/PreLoader";

// Actions
import { selectedEnvelope } from "./../../actions/envelopeAction";

const EnvelopeList = ({
	envelopeState: { envelopes, loading, selected },
	selectedEnvelope,
}) => {
	if (envelopes === null || loading) {
		return <PreLoader />;
	}

	const onClick = (id) => {
		if (id === selected) {
			return selectedEnvelope(null);
		}
		selectedEnvelope(id);
	};

	return envelopes.length === 0 ? (
		<p>No envelope found</p>
	) : (
		<Table responsive hover className="envelope-list">
			<thead>
				<tr>
					<th>#</th>
					<th>Purpose</th>
					<th>Goal Money</th>
					<th>Date</th>
				</tr>
			</thead>
			<tbody>
				{envelopes.map((e, i) => (
					<tr
						key={i}
						onClick={() => onClick(e._id)}
						className={`${
							selected === e._id && "bg-primary text-white"
						}`}
					>
						<th>{i + 1}</th>
						<td>{e.purpose}</td>
						<td>{e.goalMoney.toLocaleString()}</td>
						<td>{moment(e.dateCreated).format("MMMM DD YYYY")}</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
};

EnvelopeList.propTypes = {
	envelopeState: PropTypes.object.isRequired,
	selectedEnvelope: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	envelopeState: state.envelopeState,
});

export default connect(mapStateToProps, { selectedEnvelope })(EnvelopeList);
