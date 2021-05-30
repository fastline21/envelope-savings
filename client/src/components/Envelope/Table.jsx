import React from 'react';
import { Col, Row, OverlayTrigger, Tooltip } from 'react-bootstrap';
import moment from 'moment';

const Table = ({ envelope }) => {
	const LoadNumber = () => {
		const render = [];
		let rollNumber = 1;

		const isRollNumber = (rollNumber) =>
			envelope.envelopes.some((element) => element.money === rollNumber);

		const getDate = (rollNumber) => {
			const dateRoll = envelope.envelopes.find(
				(element) => element.money === rollNumber
			);
			return dateRoll.date;
		};
		for (rollNumber; envelope.amount >= rollNumber; rollNumber++) {
			render.push(
				<Col xs={2} sm={2} md={1} lg={1} xl={1} key={rollNumber}>
					<OverlayTrigger
						key='top'
						placement='top'
						overlay={
							isRollNumber(rollNumber) ? (
								<Tooltip>
									{moment(getDate(rollNumber)).format(
										'MMMM DD, YYYY'
									)}
								</Tooltip>
							) : (
								<span></span>
							)
						}
					>
						<p
							className={`roll-number text-center${
								isRollNumber(rollNumber)
									? ' text-white bg-dark'
									: ''
							}`}
						>
							{rollNumber}
						</p>
					</OverlayTrigger>
				</Col>
			);
		}

		return render;
	};

	return <Row>{envelope && <LoadNumber />}</Row>;
};

export default Table;
