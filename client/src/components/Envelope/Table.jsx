import React from 'react';
import { Col, Row } from 'react-bootstrap';

const Table = ({ envelope }) => {
	const LoadNumber = () => {
		const render = [];
		let rollNumber = 1;

		const isRollNumber = (rollNumber) =>
			envelope.envelopes.some((element) => element.money === rollNumber);

		for (rollNumber; envelope.amount >= rollNumber; rollNumber++) {
			render.push(
				<Col xs={1} key={rollNumber}>
					<p
						className={`text-center ${
							isRollNumber(rollNumber) ? 'text-primary' : ''
						}`}
					>
						{rollNumber}
					</p>
				</Col>
			);
		}

		return render;
	};

	return <Row>{envelope && <LoadNumber />}</Row>;
};

export default Table;
