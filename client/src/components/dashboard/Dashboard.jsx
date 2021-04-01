import React from "react";
import { Container } from "react-bootstrap";

// Components
import EnvelopeList from "./EnvelopeList";

const Dashboard = () => {
	return (
		<Container className="pt-5">
			<EnvelopeList />
		</Container>
	);
};

export default Dashboard;
