import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Components
import EnvelopeList from "./EnvelopeList";

// Actions
import { getAllEnvelopes } from './../../actions/envelopeAction';

const Dashboard = ({ getAllEnvelopes }) => {
	useEffect(() => {
		getAllEnvelopes();
		// eslint-disable-next-line
	}, []);

	return (
		<Container className="pt-5">
			<EnvelopeList />
		</Container>
	);
};

Dashboard.propTypes = {
	getAllEnvelopes: PropTypes.func.isRequired,
};

export default connect(null, { getAllEnvelopes })(Dashboard);