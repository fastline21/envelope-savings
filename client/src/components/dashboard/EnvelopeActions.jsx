import React, { useState, Fragment } from "react";
import { Button } from "react-bootstrap";

// Components
import EnvelopeModal from "./EnvelopeModal";

const EnvelopeActions = () => {
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
			>
				View
			</Button>
			<Button
				variant="success"
				size="lg"
				block
				onClick={() => setShowModal("add")}
			>
				Add
			</Button>
			<Button variant="warning" size="lg" block>
				Edit
			</Button>
			<Button variant="danger" size="lg" block>
				Delete
			</Button>
		</Fragment>
	);
};

export default EnvelopeActions;
