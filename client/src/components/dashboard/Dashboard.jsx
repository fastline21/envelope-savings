import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Components
import EnvelopeList from "./EnvelopeList";
import EnvelopeActions from "./EnvelopeActions";

// Actions
import { getAllEnvelopes } from "./../../actions/envelopeAction";

const Dashboard = ({ getAllEnvelopes }) => {
	useEffect(() => {
		getAllEnvelopes();
		// eslint-disable-next-line
	}, []);

	return (
		<Container className="pt-5">
			<Row>
				<Col xl={9} lg={9} md={12} sm={12}>
					<EnvelopeList />
				</Col>
				<Col xl={3} lg={3} md={12} sm={12}>
					<EnvelopeActions />
				</Col>
			</Row>
		</Container>
	);
};

Dashboard.propTypes = {
	getAllEnvelopes: PropTypes.func.isRequired,
};

export default connect(null, { getAllEnvelopes })(Dashboard);
